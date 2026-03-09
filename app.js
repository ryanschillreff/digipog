const FORMBAR_ADDRESS = 'https://formbar.yorktechapps.com';
const { log } = require('console');
const express = require('express')
const path = require("path")
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})
const session = require('express-session');

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

app.post('/submitpage', (req, res) => {
    console.log(req.body.id);
    // Get the data ready
    const payload = {
        from: req.body.from,
        to: 90,
        amount: 50,
        reason: 'Testing...',
        pin: req.body.pin
    };
    // Make the transfer request
    fetch(`${FORMBAR_ADDRESS}/api/digipogs/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then((transferResult) => {
        return transferResult.json();
    }).then((responseData) => {
        console.log(responseData.success);
        app.get('/game', (req, res) => {
            if (req.session.paid) {
                req.session.destroy();
                res.sendFile(path.join(__dirname, 'game.html'));
            } else {
                alert("You must pay before accessing the game.");
            }

        });
        // responseData will be: { success: true/false, message: "..." }
    });
})
app.get('/game', (req, res) => {

    if (req.session.paid) {
        res.sendFile(path.join(__dirname, 'game.html'));
    } else {
        res.alert("ERROR: You are broke. Please go back and pay.");
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


