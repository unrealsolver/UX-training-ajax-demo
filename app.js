var express = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash')

var app = express()

app.use('/', express.static(__dirname + '/app'))

app.use(bodyParser.json())

var users = [
  {
    id: 0,
    name: 'Vasily'
  },
  {
    id: 1,
    name: 'Andrei'
  },
]

app.route('/user/:id')
  .get(function(req, res) {
    res.send(_.where(users, {id: +req.params.id}))
  })
  .delete(function(req, res) {
    users = _.filter(users, function(d) {
      return d.id != +req.params.id
    })
    console.log(users)
    res.send()
  })


app.route('/user')
  .get(function(req, res) {
    res.send(users)
  })
  .post(function(req, res) {
    var user = req.body
    var id = Math.floor(Math.random()*100)
    user.id = id
    users.push(user)
    res.send(user)
  })




var server = app.listen(3000, function () { 
  console.log('Listening...')
})

