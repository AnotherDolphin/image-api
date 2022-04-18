// app.use(express.static(__dirname + '/public'));
import express from 'express'
import post from './routes/post'

const app = express()
const port = 3000

// statically deliver uploaded images
app.use('/gallery/', express.static('gallery'));

// upload route
app.use('/post', post)

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname })
})

app.listen(port, () => console.log('listening ...'))
