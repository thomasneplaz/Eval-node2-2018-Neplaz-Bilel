const express = require('express')

const port = 4002

const app = express()

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})