---
layout:     post
title:      Using composed_of in Rails to represent value objects
date:       2015-12-24 00:30:00
summary:
categories: rails
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

Rails has his own way to represent value objects through the `composed_of`
class method.

Suppose your `User` class has a `AgeGroup`, but you don't want to create
a table for it since it is a value object just describing a state for the
`User`. In this case we can create the `age_group` attribute inside the `users`
table and represent it in a proper class with its own business rules.

Let's see the code for this example:

```ruby
class User < ActiveRecord::Base
  composed_of :age_group,
              class_name: 'AgeGroup',
              mapping: %w(age_group age)
end

class AgeGroup
  attr_reader :age

  def initialize(age)
    @age = age
  end

  def name
    return 'infant' if age <= 2
    return 'kid' if age <= 13
    return 'teenager' if age <= 19
    return 'adult' if age <= 40
    return 'middle_age' if age <= 60
    return 'senior'
  end
end
```

Now, in the console:

```ruby
irb(main):001:0> u = User.new(name: 'John', age_group: AgeGroup.new(25))
=> #<User id: nil, name: "John", age_group: 25>
irb(main):002:0> u.age_group.name
=> "adult"
```
