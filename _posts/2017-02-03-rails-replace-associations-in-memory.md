---
layout:     post
title:      Replace ActiveRecord relations in memory
date:       2017-02-03 12:00:00
summary:    Replace ActiveRecord relations in memory before saving.
categories: rails
author:
  name: Felix Descoteaux
  twitter: FelixDescoteaux
---

I came across a particular situation where I needed to validate
`has_many` relations dependencies from a parent model before committing
replacements to the database.

`transactions` can achieve the same thing by doing a rollback if the parent is
invalid, but at the cost of database queries and coupling.

For example, let's say we have a `Person` model, and a person can have pets, but
no dogs and cats at the same time because they'll kill each other.

```ruby
class Person < ActiveRecord::Base
  has_many :pets, dependent: :destroy
  validate :has_one_type_of_pet

  def has_one_type_of_pet
    if owns_a_cat? && owns_a_dog?
      errors.add(:pets, 'cannot have a both a cat and a dog')
    end
  end

  def owns_a_cat?
    pets.any? { |pet| pet.animal_type == Cat.name }
  end

  def owns_a_dog?
    pets.any? { |pet| pet.animal_type == Dog.name }
  end
end

class Pet < ActiveRecord::Base
  belongs_to :user
  belongs_to :animal, polymorphic: true

  validates :animal_type, inclusion: { in: [Cat.name, Dog.name] }
end

class Cat < ActiveRecord::Base; end

class Dog < ActiveRecord::Base; end>>
```

Now let's say that Bob has 2 cats already, but Grimelda, with `id=1`,
attacked his newborn baby so he wants to get rid of it.
Josephine, with `id=2`, is really sweet and wouldn't hurt a fly, so Bob
wants to keep it.

Let's say that person also wants a new dog, because cats can be boring.
Bob goes to the shelter and decides to adopt Jack, who has an `id` of `3`.

That person would do a `PUT` request to do the replacements.

```
PUT /person/342
{
  "cat_ids": [2], // already owned
  "dog_ids": [3]  // a new dog
}
```

`ActiveRecord` lets us `#build` new associations in memory, but not delete in
memory those we don't want anymore before committing (sorry Grimelda).

Normally, a way to validate the associations would be to validate after replacing the associations inside a transaction, but
that makes me puke in my mouth a little, why would we even need to touch the database?

```ruby
person.transaction do
 person.pets.replace([
   Pet.new(animal_id=2, animal_type=Cat.name),
   Pet.new(animal_id=3, animal_type=Dog.name),
 ])
 raise ActiveRecord::Rollback unless person.valid?
end
```

A way to replace associations in memory is... *DRUM ROLLS* ... `#mark_for_destruction`.
We can mark for destructions records we want to get rid off and ignore those
during validation.

First we need to do some changes to our models. We need to add the `autosave: true`
option to our association and filter out instances that are marked for
destruction in validation.

```ruby
class Person < ActiveRecord::Base
  has_many :pets, dependent: :destroy, autosave: true
  validate :has_one_type_of_pet

  def has_one_type_of_pet
    if owns_a_cat? && owns_a_dog?
      errors.add(:pets, 'cannot have a both a cat and a dog')
    end
  end

  def owns_a_cat?
    pets.reject(&:marked_for_destruction?)
      .any? { |pet| pet.animal_type == Cat.name }
  end

  def owns_a_dog?
    pets.reject(&:marked_for_destruction?)
      .any? { |pet| pet.animal_type == Dog.name }
  end
end
```

Then we can validate in memory before touching the database.

```ruby
existing_cat_ids = person.pets
  .select { |pet| pet.animal_type == Cat.name }
  .map(&:animal_id)

new_cat_ids = provided_cat_ids - existing_cat_ids
new_cat_ids.each { |id| person.pets.build(animal_type: Cat.name, animal_id: id) }

deprecated_cat_ids = existing_cat_ids - provided_cat_ids
person.pets.select do |pet|
  pet.animal_type == Cat.name && pet.animal_id.in?(deprecated_cat_ids)
end.each(&:mark_for_destruction)

# Do the same thing with dogs..

# We can now validate without replacing, only instances not
# marked for destruction will be validated.
person.valid?

# Will save new associations only and delete unwanted ones
person.save
```
