const express = require('express')
const app = express()

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(4003, () => {
  console.log('Your app listening on port 4003!')
})
