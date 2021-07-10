const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const dbConfig = require('./config/DbConfig')
const cors = require('cors')
const path = require('path')

mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connect mongodb"))
    .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/user', require('./routes/User'))
app.use('/gas', require('./routes/Gas'))

const directory = path.join(__dirname)
app.use(express.static(directory))

app.listen(port, function () {
    console.log('Server berjalan di port '+ port)
})