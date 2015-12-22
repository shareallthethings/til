---
layout:     post
title:      Use yours gems in Rails locally without versioning them
date:       2015-12-22 13:00:00
summary:
categories: rails
author:
  name: Erich Kist
  twitter: erichkist
---

There are cases when you need to install some gems in the project but you don't want to install for
all the users like debug, silence pipeline, etc.

Normally you change the Gemfile and before finish your code you have to take care to remove the changes.

You can easily manage this by creating a new `Gemfile.local`:

```ruby
# Gemfile.local
eval File.read(File.expand_path('../Gemfile', __FILE__))

group :development do
  gem 'quiet_assets'
end
```

To easy the process, you can copy the `Gemfile.lock` to `Gemfile.local.lock`.

Run `BUNDLE_GEMFILE=Gemfile.local bundle install` to update it with the gems that you need to use.

Then, you run the command `BUNDLE_GEMFILE=Gemfile.local rails s` to load the server with the changes.
You will need to update the `.gitignore` to not dirty the worktree.
