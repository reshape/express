const reshape = require('reshape')
const node = require('when/node')
const fs = require('fs')
const readFile = node.lift(fs.readFile.bind(fs))

module.exports = (app, options = {}, ext = 'html') => {
  app.engine(ext, (filePath, locals = {}, cb) => {
    readFile(filePath, 'utf8')
      .then((content) => reshape(options).process(content))
      .then((res) => res.output(locals))
      .done((out) => cb(null, out), (err) => cb(err))
  })
}
