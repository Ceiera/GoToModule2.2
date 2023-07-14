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
  res.status(200).send(JSON.stringify(playlist))
})

app.post('/tambah-lagu', (req, res) => {
  const { title, artists,  url} = req.body
  const newArtis = artists.split('/')
  const arraysaved = []
  newArtis.forEach(element => {
    arraysaved.push({name: element})
  });
  console.log(arraysaved);
  const dataSaved = {
    title: title,
    artists: arraysaved,
    url: url
  }
  const play = playlist
  play.push(dataSaved)
  console.log(play);
  fs.writeFile('playlist.json', JSON.stringify(play), (err, done) => {
    if (err) {
      res.status(500).send({ error: "error pas write file" })
    }else{
      res.status(200).send(playlist)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})