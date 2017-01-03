---
layout:     post
title:      Rails Associations and namespacing
date:       2017-01-03 21:00:00
summary:    Rails Associations and namespacing
categories: rails
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

When you have some `models` under namespaces in Rails you have to use the
`class_name` option to refer to the right class,
[unless they are in the same namespace](http://guides.rubyonrails.org/association_basics.html#controlling-association-scope). Example:

```ruby
module Business
  class Supplier < ApplicationRecord
     has_one :account,
      class_name: "Billing::Account"
  end
end

module Billing
  class Account < ApplicationRecord
     belongs_to :supplier,
      class_name: "Business::Supplier"
  end
end
```
Foreign keys works in a similar way. Using the example above, if we named the
foreign key in the `suppliers` table as `billing_account_id` we would need to
specify the association as:

```ruby
module Business
  class Supplier < ApplicationRecord
     has_one :account,
      class_name: "Billing::Account",
      foreign_key: :billing_account_id
  end
end
```

Note the new `foreign_key` option.

This happens because the `foreign_key` ignores the namespace, in our case it
would search for a column with the name `account_id` instead of
`billing_account_id`. Let's see this in action:

```ruby
foreign_key('Billing::Account’) # => "account_id"
```
