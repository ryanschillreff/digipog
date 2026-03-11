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
app.get('/game.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/game.html'))

})
app.get('/party.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/party.html'))

})

app.post('/submitpage', (req, res) => {
    const payload = {
        from: req.body.from,
        to: 1,
        amount: 1,
        reason: 'Play Party Crashers',
        pin: req.body.pin
    };

    fetch(`${FORMBAR_ADDRESS}/api/digipogs/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then((transferResult) => transferResult.json())
        .then((responseData) => {
            if (responseData.success) {
                res.redirect('/game.html');
            } else {
                res.send("ERROR: " + responseData.message);
            }
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


