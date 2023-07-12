const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const playlist = require('./playlist.json')
const fs = require('fs')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//get list
app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'))
})
app.get('/tambah', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/tambah.html'))
})

app.get('/ambil-lagu', (req, res) => {
  console.log(playlist);
  res.status(200).send(JSON.stringify(playlist))
})

app.post('/tambah-lagu', (req, res) => {
  console.log(req.body);
  const {name, url} = req.body
  const artist = req.body.artist
  const newArtis = artist.split('/')
  const arraysaved = []
  newArtis.forEach(element => {
    arraysaved.push({name: element})
  });
  const dataSaved = {
    name: name,
    artist: arraysaved,
    url: url
  }
  const listBaru = playlist.push(body)
  fs.writeFile('playlist.json', JSON.stringify(listBaru), (err, done) => {
    if (err) {
      res.status(500).send({ error: "error pas write file" })
    }else{
      res.status(201).send(playlist)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})