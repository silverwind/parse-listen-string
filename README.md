# parse-listen-string
[![](https://img.shields.io/npm/v/parse-listen-string.svg?style=flat)](https://www.npmjs.org/package/parse-listen-string) [![](https://img.shields.io/npm/dm/parse-listen-string.svg)](https://www.npmjs.org/package/parse-listen-string)

Node.js module to parse a listen string like `0.0.0.0:443`.

## Install

```bash
npm i parse-listen-string
```

## Usage
```js
import {parseListenString} from "parse-listen-string";

parseListenString("0.0.0.0:80")
//=> {host: "0.0.0.0", port: 80, proto: "http"}

parseListenString("https://[::1]:443")
//=> {host: "::1", port: 443, proto: "https"}
```

## API
### parseListenString(listenString)

* `listenString` *String* or *Number*: A listen string to parse

Returns a object or `null` if string can not be parsed. Object properties:

- `proto` *String*. Protocol, either `http` or `https`
- `host` *String*: Listen host in form of an IP address
- `port` *Number*: Listen port
- `path` *String*: Unix socket path, this is mutual exclusive with `host` and `port`

© [silverwind](https://github.com/silverwind), distributed under BSD licence
