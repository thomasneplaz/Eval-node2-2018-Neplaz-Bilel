const express = require('express')
var fs = require('fs-extra')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq'

const port = 4001

const app = express()

let mdp

app.get('/', (req, res) => {
  if(req.query.val) {
    let newPass = req.query.val
    mdp = encrypt(newPass)
  } else {
    mdp = encrypt(mdp)
  }
  fs.writeFileSync(__dirname + '/data/secret.txt',mdp)
  const decryptsecret = decrypt(fs.readFileSync(__dirname + '/data/secret.txt','utf8'))
  res.send(`<form action="/" method="GET">
              <input name="val" type="text" value="${decryptsecret}">
              <input type="submit" value="Modifier">
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