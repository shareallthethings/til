---
layout:     post
title:      Method Introspection
date:       2015-12-15 16:00:00
summary:    Method Introspection
categories: ruby
author:
  name: Bernardo Chanves
  twitter: bernardoamc
---

In Ruby we can use method introspection with the `Method` class.

To generate this we can rely on the (guess what?!) `method` method. Its usage is:
`class_or_instance.method(:method_name)`

The command above will generate an instance of the `Method` class, that has some useful methods like
`source_location`, that display the file and line where the method is declared (only if the class is
not defined on a C file, otherwise it will return `nil`).

If we use `require 'method_source'` we can also use: `source.display` and `comment.display` methods,
which are pretty useful.

Let’s see one example:

```ruby
irb(main):043:0> ActiveRecord.method(:presence).source.display
def presence
  self if present?
end
=> nil
```
