---
layout:     post
title:      vim normal command
date:       2016-08-20 10:00:00
summary:
categories: vim
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

Sometimes it is useful to use the `:normal` command in VIM, what it does is
accept a sequence of keys and pretend they were typed in normal mode.

Let's see how this works with a quick example. Suppose we have a file like the
following:

```
   1  Abc,123
   2  Bcd,4
   3  Cde,54321
   4  Def,88
```

And we want the end result to be:

```
Abc
Bcd
Cde
Def
```

To solve this in one command we can select the lines we want to modify and use:

`normal 02dwf,d$`

What the command is saying is: "Go to the beginning of the line and delete the
next to words, now find a comma and delete everything from this point to the end
of the line." Pretty cool, right?

Things to keep in mind:

- If you don't want your command to use mappings use `normal!` instead
  of `normal`.
- If you want to use special characters like `<esc>` and `<cr>` use the `execute`
  command.

So, as mentioned above, an example of `execute` would be:

`:execute "normal! command\<esc>"`.
