---
layout:     post
title:      Rendering templates in Phoenix
date:       2016-01-23 10:00:00
summary:    We will take a look in how Phoenix render templates and see that
            there is no magic at all involved.
categories: phoenix
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

Did you ever asked yourself how Phoenix render templates? Well, luckily for us, there
is no magic at all in the process!

We will start with a simple `render` in our `PageController` controller for an
`index` action.

```elixir
def index(conn, _params) do
  var = ...
  render conn, "page.html", some_var: var
end
```

Since we have a `PageController` we are expected to have a module called
`PageView`, but why? This is where things get interesting. First we need to
know that a template gets compiled into a function in our `PageView` module,
and that is why you have to define it in the first place.

To be more visual, a `template` called `index.html.eex` will become this
in our `view`:

```elixir
def render("index.html", assigns) do
  #markup we defined in our template.
end
```

So, when we call `render` in our controllers all that gets invoked is the generated
function in the respective `view`!
