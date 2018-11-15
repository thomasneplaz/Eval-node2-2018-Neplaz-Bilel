const express = require('express')
var fs = require('fs-extra')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq'

const port = 4001

const app = express()

let mdp = 'secret'

app.get('/', (req, res) => {
  mdp = encrypt(mdp)
  fs.writeFileSync(__dirname + '/data/secret.txt',mdp)
  const decryptsecret = decrypt(fs.readFileSync(__dirname + '/data/secret.txt','utf8'))
  res.send(`<form action="/" method="GET">
              <input id="val" type="text" value="${decryptsecret}">
              
            </form>
            <br/>
            <h3>${mdp}</h3>`)
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
  

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex')
  return crypted
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8')
  return dec
}