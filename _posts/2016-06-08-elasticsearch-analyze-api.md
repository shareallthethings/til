---
layout:     post
title:      elasticsearch analyze api
date:       2016-06-08 10:00:00
summary:
categories: elasticsearch
author:
  name: Bernardo Chaves
  twitter: bernardoamc
---

TIL about `tokenizer`, `token_filter` and `char_filter` in the [analyze
API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-analyze.html).

I usually test a custom analyzer or a field analyzer using this API, but using
the options above it is possible to test an analyzer even before
creating it, we just need to specify what it will contain.

Let's see an example:

```sh
$ curl 'localhost:9200/_analyze' -d '
{
  "tokenizer" : "standard",
  "token_filter" : ["lowercase", "stop"],
  "char_filter" : ["html_strip"],
  "text" : "the analyze api <b>test</b>"
}'

{
  "tokens":[
    {"token":"analyze","start_offset":4,"end_offset":11,"type":"<ALPHANUM>","position":1},
    {"token":"api","start_offset":12,"end_offset":15,"type":"<ALPHANUM>","position":2},
    {"token":"test","start_offset":19,"end_offset":27,"type":"<ALPHANUM>","position":3}
  ]
}
```

We can also pass these options as request parameters:

```shell
$ curl "localhost:9200/_analyze?tokenizer=standard\
&token_filter=lowercase,stop\
&char_filter=html_strip\
&text=the+analyze+api+<b>test</b>"

{
  "tokens":[
    {"token":"analyze","start_offset":4,"end_offset":11,"type":"<ALPHANUM>","position":1},
    {"token":"api","start_offset":12,"end_offset":15,"type":"<ALPHANUM>","position":2},
    {"token":"test","start_offset":19,"end_offset":27,"type":"<ALPHANUM>","position":3}
  ]
}
```
