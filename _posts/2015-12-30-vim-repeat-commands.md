---
layout:     post
title:      Repeat commands
date:       2015-12-30 07:00:00
summary:    There are single, multiple and complex repeats. You need to know 3 of them.

categories: vim
author:
  name: Erich Kist
  twitter: erichkist
---

You can repeat your commands in vim with single, multiple and complex repeats. If you master the
difference between three of them, you will be more productive:

### `.`

Single repeat. Repeat last change. E.g: You add an semicolon at the end of line.

### `@:`

Single repeat. Repeat last command-line. E.g: Your last command to see the help (`h @:`).

### `&`

Synonym for `:s` (repeat last substitute).
