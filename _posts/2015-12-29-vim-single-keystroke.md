---
layout:     post
title:      Single keystroke to help us
date:       2015-12-29 19:00:00
summary:    Vim has several commands that are compounds two actions. Let's see some of them.

categories: vim
author:
  name: Erich Kist
  twitter: erichkist
---

Vim has a lot of commands compounds of two actions to help us. Let's see some of them (You should
give preference to the left of the command):

```
Compound Command -> Equivalent in Longhand

# Replace all the chars from current position to the end of line.
C -> c$

# Replace the next char.
s -> cl

# Replace all the line.
S -> ^C

# Go to the beginning of the line and enable Insert mode.
I -> ^i

# Go to the end of line and enable Insert mode.
A -> $a

# Create a new line below the current line and enable Insert mode.
o -> A<CR>

# Create a new line before the current line and enable Insert mode.
O -> ko
```
