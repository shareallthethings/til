---
layout:     post
title:      Checking Unicode character by category
date:       2016-01-20 09:00:00
summary:    Regular expression can check if the input is from 'letter' category comparing the
            Unicode character.
categories: regex
author:
  name: Erich Kist
  twitter: erichkist
---

I was doing an Elixir exercise in the [exercism.io](http://exercism.io/exercises/elixir/bob/readme)
and one of the tests was to check if a sentence was just numbers. Regular expressions can check
the unicode:

```elixir
iex(1)> sentence = "1, 2, 3"
"1, 2, 3"
iex(2)> sentence =~ ~r/\p{L}/
false
iex(3)> sentence =~ ~r/\P{L}/
true
```

"One is that each Unicode character belongs to a certain category. You can match a single character
belonging to the 'letter' category with \p{L}. You can match a single character not belonging to
that category with \P{L}." (Ref.:
[http://www.regular-expressions.info/unicode.html](http://www.regular-expressions.info/unicode.html))
