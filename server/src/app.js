const webPush = require('web-push')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ruid = require('express-ruid')
const logger = require('./logger')
const bcrypt = require('bcrypt')
const userRepo = require('./user-repo')

const saltRounds = process.env.SALT_ROUNDS || 10;

const app = express()
const port = process.env.PORT || 3010

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(ruid())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('health check')
})

app.get('/health', (req, res) => {
    res.send('health check')
})

let vapidKeys;

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    vapidKeys = webPush.generateVAPIDKeys()
    console.log('-------------KEYS UNSET. GENERATED RANDOM KEYS-------------')
    console.log(vapidKeys);
    webPush.setVapidDetails(
        process.env.FRONTEND_URL,
        vapidKeys.publicKey,
        vapidKeys.privateKey
    )
} else {
    vapidKeys = { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY }
    webPush.setVapidDetails(
        "https://www.google.com",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    )
}

app.post('/login', async (req, res) => {
    try {
        const result = await userRepo.getUserByUsername(req.body.username)
        if(result.length !== 1) throw new Error()
        const stored_hash = result[0].password_hash
        const isValid = await bcrypt.compare(req.body.password, stored_hash)
        res.send({
            id: result[0].id,
            username: result[0].username
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid Username or Password')
    }
})

app.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashed_password = await bcrypt.hash(req.body.password, salt)
        await userRepo.createUser(req.body.username, hashed_password)
        res.status(201).send('User Created')
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad Request')
    }
})

app.get('/keys', (req, res) => {
    logger.log(req, 'keys requested')
    res.send(vapidKeys.publicKey)
})

app.post('/register', async (req, res) => {

})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})