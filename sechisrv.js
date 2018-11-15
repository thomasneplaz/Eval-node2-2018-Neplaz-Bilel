const express = require('express')
const fetch = require('node-fetch');
var stringify = require('json-stringify-safe');
const port = 4002

const app = express()

let tab = []
let i = ""

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

setInterval(() => {
  let valtime = new Promise((resolve, reject) => {
    fetch('localhost:4000')
      .then(function(response) {
        resolve(response.body.text())
      }, function(error) {
        error.message
      })
  })
  let valpass = new Promise((resolve, reject) => {
    fetch('localhost:4001/?val=secret')
      .then(function(response) {
        resolve(response.body.text())
      }, function(error) {
        error.message
      })
  })

  Promise.all({"time" : valtime,"secret" : valpass})
    .then(res => {
      if(tab.length < 10) {
        tab.splice(-1,0,res) 
      } else {
        tab.splice(8,1)
        tab.splice(-1,0,res)
      }
    })
  return tab
} ,5000)

app.get('/', (req, res) => {
  res.send(stringify(tab))
})

app.get('/' + i, (req,res) => {
  if(i>10 && i >=0){
    res.send('Error')
  } else {
    res.send(tab)
  }
  
})
