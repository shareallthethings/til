---
layout:     post
title:      console.table option
date:       2016-03-04 10:00:00
summary:
categories: javascript
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

TIL that `console.table` exists in my browser dev tools.

Let's see how this works:

```javascript
manufacturers = [
  {name: 'Toyota', country: 'Japan', rank: 1},
  {name: 'General Motors', country: 'EUA', rank: 2},
  {name: 'Volkswagen', country: 'Germany', rank: 3}
]

console.table(manufacturers)
```

This will display a table like:

<div class='gallery'>
  {% img 'console/table.png' alt:'console.table' %}
</div>
