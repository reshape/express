const reshapeExpress = require('..')
const standard = require('reshape-standard')
const exp = require('reshape-expressions')
const express = require('express')
const supertest = require('supertest-as-promised')
const test = require('ava')

test('defaults', (t) => {
  const app = express()
  reshapeExpress(app, { plugins: exp() })
  app.set('views', './fixtures')
  app.set('view engine', 'html')
  app.get('/', (req, res) => res.render('index.html', { foo: 'bar' }))

  return supertest(app).get('/').expect(200).then((res) => {
    t.is(res.text.trim(), '<p>bar</p>')
  })
})

test('no opts', (t) => {
  const app = express()
  reshapeExpress(app)
  app.set('views', './fixtures')
  app.set('view engine', 'html')
  app.get('/', (req, res) => res.render('index.html'))

  return supertest(app).get('/').expect(200).then((res) => {
    t.is(res.text.trim(), '<p>{{ foo }}</p>')
  })
})

test('with reshape-standard', (t) => {
  const app = express()
  reshapeExpress(app, standard(), 'sgr')
  app.set('views', './fixtures')
  app.set('view engine', 'sgr')
  app.get('/', (req, res) => res.render('index.sgr', { foo: 'bar' }))

  return supertest(app).get('/').expect(200).then((res) => {
    t.is(res.text.trim(), '<p>bar</p>')
  })
})

test('error', (t) => {
  const app = express()
  reshapeExpress(app, standard(), 'sgr')
  app.set('views', './fixtures')
  app.set('view engine', 'sgr')
  app.get('/', (req, res) => res.render('error.sgr', { foo: 'bar' }))

  return supertest(app).get('/').then((res) => {
    t.is(res.status, 500)
  })
})
