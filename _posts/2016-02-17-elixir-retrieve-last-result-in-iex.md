---
layout:     post
title:      "Retrieve last result in IEX"
date:       2016-02-17 15:00:00
summary:    If you already play with Ruby, probably you run 'my_var = _' to get the last result. How
            do you do this with Elixir?
categories: elixir
author:
  name: Erich Kist
  twitter: erichkist
---

In Ruby you have some tricks in the console. I always use the `_` to retrieve the last return value.

In Elixir, you have the same approach with `v`. Let's see:

```elixir
iex(1)> h v

                                 def v(n \\ -1)

Retrieves the nth expression's value from the history.

Use negative values to lookup expression values relative to the current one.
For instance, v(-1) returns the result of the last evaluated expression.

iex(2)> 1 + 1
2
iex(3)> 2 + 2
4
iex(4)> v
4
iex(5)> v(2)
2
```

As you can see, the function `v` can retrieve the last value because it's using the default value `-1`.
You can use `v(line_number)` to select the value that you want to retrieve.
