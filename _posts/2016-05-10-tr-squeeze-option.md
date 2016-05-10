---
layout:     post
title:      tr squeeze option
date:       2016-05-10 10:00:00
summary:
categories: unix
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

TIL about the `-s` flag in the `tr` command. What it does in practice is:

> Squeeze multiple occurrences of the characters listed in the last operand
(either string1 or string2) in the input into a single instance of the
character. This occurs after all deletion and translation is completed.

Let's see how this works with an example:

```ruby
$ echo 'hello         world' | tr -s ' '
'hello world'
```

We can show that the `squeeze` occurs after all translation is completed with
this example:

```ruby
$ echo 'hello         world' | tr -s 'l' ' '
'he o wor d'
```

If the `squeeze` occurred before the translation the expected result would
have two spaces between `he` and `o` substrings instead of just one as
the above result.
