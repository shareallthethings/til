---
layout:     post
title:      vim repeat substitute
date:       2016-04-19 10:00:00
summary:
categories: vim
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

TIL about `&` command in Vim and how it can be used to repeat the last search and
replace pattern.

Let's see how this works with a quick example. Suppose we have a file like the
following:

```
rock paper scissors
rock paper scissors
rock paper scissors
```

And you want to replace the word `rock` with `lizard` just in the lines one and
three (don't ask me why). Normally I would do something like:

`1s/rock/lizard/ | 3s/rock/lizard`

But there is a shortcut, the `&` command that achieves the same result.

`1s/rock/lizard/ | 3&`

But there is a catch. The `&` command only repeat the last search and replace
*without* flags. To keep the flags you need to use the `&` command with the
(guess what?) `&` flag. If we had a flag in the last example it would become:

`1s/rock/lizard/ | 3&&`
