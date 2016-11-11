# Reshape Express

[![npm](https://img.shields.io/npm/v/reshape-express.svg?style=flat-square)](https://npmjs.com/package/reshape-express)
[![tests](https://img.shields.io/travis/reshape/express.svg?style=flat-square)](https://travis-ci.org/reshape/express?branch=master)
[![dependencies](https://img.shields.io/david/reshape/express.svg?style=flat-square)](https://david-dm.org/reshape/express)
[![coverage](https://img.shields.io/coveralls/reshape/express.svg?style=flat-square)](https://coveralls.io/r/reshape/express?branch=master)

An express view engine for reshape

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install reshape-express -S`

> **Note:** This project is compatible with node v6+ only

### Usage

Require it and run the exported function, passing it your express `app` and your reshape options, plugins, etc. It will match `.html` files by default, you can pass an alternate file type as the third argument if you want.

Then set up your views directory and view engine, and pass in any locals when you run `res.render`. That's it! Example below:

```js
const express = require('express')
const reshape = require('reshape-express')
const standard = require('reshape-standard')

const app = express()
reshape(app, standard(), 'sgr')

app.set('views', './views')
app.set('view engine', 'sgr')

app.get('/', (req, res) => {
  res.render('index.sgr', { foo: 'bar' })
})

app.listen(3000)
```

And in `views/index.sgr`:

```jade
h1 Test Page!
p {{ foo }}
```

Should come out rendered correctly with locals and all. Whoo! 🎉

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
