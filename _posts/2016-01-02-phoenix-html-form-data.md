---
layout:     post
title:      Phoenix.HTML.FormData Protocol
date:       2016-01-02 22:00:00
summary:
categories: phoenix
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

In [Phoenix](http://phoenixframework.org/) we can build a form from an
[Ecto.Changeset](https://hexdocs.pm/ecto/Ecto.Changeset.html). This is only possible
because `Ecto.Changeset` implements a protocol called `Phoenix.HTML.FormData`.

With this protocol a changeset knows how to convert itself in a structure
required by Phoenix forms. If you are really curious about the implementation,
it's
[here](https://github.com/phoenixframework/phoenix_ecto/blob/master/lib/phoenix_ecto/html.ex).

Example of how to use a form with a changeset:

```elixir
# controller
changeset = User.changeset(%User{})
render conn, "new.html", changeset: changeset

# template
<%= form_for @changeset, user_path(@conn, :create), fn f -> %>
```
