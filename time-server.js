const express = require('express')
const app = express()

app.get('/', (req, res) => {
    let now = new Date();
    let heure   = now.getHours();
    let minute  = now.getMinutes();
    let seconde = now.getSeconds();
    let simpleString = "Hello World! et il est " + heure + " heure " + minute + " minutes " + seconde + " secondes"
  
  switch (req.accepts(['json', 'html'])) {
    case 'json':
    const data = [{heure: heure, minute: minute, seconde: seconde}]
    res.header({'Content-Type': 'application/json'}).json(data)
    break
    case 'html':
    res.setHeader('Content-Type', 'text/html')
    res.send(`<p style="color:blue">${simpleString}</p>`)
    break
  }
})

app.listen(4000, () => {
  console.log('Your app listening on port 4000!')
})
