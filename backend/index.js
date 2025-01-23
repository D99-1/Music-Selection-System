const YoutubeMusicApi = require('youtube-music-api')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000
app.use(cors())


const api = new YoutubeMusicApi()

app.get('/search', (req, res) => {
    const search = req.query.search
    if (!search) {
        res.sendStatus(400)
        return
    }
    api.initalize()
    .then(info => {
    api.search(search, "song")
    .then(result => {
        res.json(result)
    });
});
});

app.listen(port, () => {
    console.log(`API at http://localhost:${port}`)
})