import express from "express"
import mongoose from "mongoose"
import Data from "./data.js"
import Videos from "./dbModel.js"



// app config
const app = express();
const port = 9000;

// middlewares
// past post and get request as json file
app.use(express.json())
app.use((req, res, next) => {
    res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next()
})

// DB config
const connection_url = "mongodb+srv://kayode:tetraoxochamber4@cluster0.wptfg.mongodb.net/tiktok?retryWrites=true&w=majority"

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// api end points
app.get ("/", (req, res) => res.status(200).send("hello world"));
app.get('/v1/posts', (req, res) => res.status(200).send(Data))
app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/v2/posts', (req, res) => {
    // adding data to database by posting to server , store in db and render in frontend
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));

// instead of const require ... add module in package.json

// 200 means okay 201 means created

