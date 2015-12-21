---
layout:     post
title:      Rake about
date:       2015-12-21 12:00:00
summary:    Some manual verifications can be fast answered with just a rake about.

categories: rails
author:
  name: Erich Kist
  twitter: erichkist
---

You can use `rake about` to get information from your project like versions (ruby, rubygems, rails
and rack), application root, database and last migration runned.

```shell
[user@ip /path/to/your/application]$ bundle exec rake about

About your application's environment
Rails version             4.2.5
Ruby version              2.2.4-p230 (x86_64-linux)
RubyGems version          2.4.5.1
Rack version              1.6.4
JavaScript Runtime        therubyracer (V8)
Middleware                Airbrake::UserInformer, Rack::Sendfile, Rack::Lock, ...
Application root          /path/to/your/application
Environment               production
Database adapter          postgresql
Database schema version   20151211162905
```
