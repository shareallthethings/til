---
layout:     post
title:      "The character set modifier: /u"
date:       2016-01-21 14:00:00
summary:    You probably already use the modifier /i in your regexes. Now, we will take a look in
            the modifier that includes Unicode characthers.
categories: regex
author:
  name: Erich Kist
  twitter: erichkist
---

It is common to use `/i` to match case-insensite. Today I learned the `/u` that will set the
characther to Unicode. An example that I was trying to change non-alphabetics for dash:

```elixir
iex(1)> sentence = "This is a test"
"This is a test"
iex(2)> String.replace(sentence, ~r/[^\w]/, "-")
"This-is-a-test"
iex(3)> String.replace(sentence, ~r/[^\w]/u, "-")
"This-is-a-test"

iex(4)> sentence = "Freude schöner Götterfunken"
"Freude schöner Götterfunken"
iex(5)> String.replace(sentence, ~r/[^\w]/, "-")
<<70, 114, 101, 117, 100, 101, 45, 115, 99, 104, 195, 45, 110, 101, 114, 45, 71, 195, 45, 116, 116,
101, 114, 102, 117, 110, 107, 101, 110>>
iex(6)> String.replace(sentence, ~r/[^\w]/u, "-")
"Freude-schöner-Götterfunken"
```

Elixir provides Perl-compatible regular expressions implemented by the PCRE library. You can see
more about modifiers in
[http://perldoc.perl.org/perlre.html#Modifiers](http://perldoc.perl.org/perlre.html#Modifiers).
