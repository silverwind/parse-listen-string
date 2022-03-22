# parse-listen-string
[![](https://img.shields.io/npm/v/parse-listen-string.svg?style=flat)](https://www.npmjs.org/package/parse-listen-string) [![](https://img.shields.io/npm/dm/parse-listen-string.svg)](https://www.npmjs.org/package/parse-listen-string)

Node.js module to parse a listen string like `0.0.0.0:443`.

## Install

```bash
npm i parse-listen-string
```

## Usage
```js
import {parseListenString} from "./index.js";

parseListenString("0.0.0.0:80") //=> {host: "0.0.0.0", port: 80, proto: "http"}
parseListenString("https://[::1]:443") //=> {host: "::1", port: 443, proto: "https"}
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
