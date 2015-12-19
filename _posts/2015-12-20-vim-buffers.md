---
layout:     post
title:      Vim Buffers
date:       2015-12-20 16:00:00
summary:    Buffers in Vim
categories: vim
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

To see which buffers are open in Vim we can use the command: `:ls`

The command above will display something like:

```ruby
  1 #h + "_posts/2015-12-20-vim-buffers.md" line 15
  2 %a   "_posts/2015-12-18-ruby-method-introspection.md" line 1
```

This means that we have two open buffers. One with the number `1` associated
with the file `_posts/2015-12-20-vim-buffers.md` and another one with the number
`2` associated with `_posts/2015-12-18-ruby-method-introspection.md`.

With this info we can access these buffers with any of the following options:

- `:b part_of_file_name <tab_to_autocomplete>`
- `:b <number>`
- `:e #number`

So, if we want to access the `ruby-method-instrospection` post we could use any
of these commands:

- `:b ruby <tab>`
- `:b 2`
- `:e #2`
