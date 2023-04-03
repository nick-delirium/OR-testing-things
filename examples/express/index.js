const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
})

app.get('/dev', (req, res) => res.sendFile(__dirname + '/devtools.mob'))

app.get('/iframe', (req, res) => {
  res.sendFile(__dirname + '/iframe.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
