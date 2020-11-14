const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const SerialPort = require('serialport');
const port = new SerialPort('/dev/tty.usbmodem14101');

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/move/:xy", async (req, res) => {
    let temp = req.params.xy.split(',');
    console.log(temp);
    x = temp[0];
    y = temp[1];
    port.write(`XM,1000,${x},${y}\r`, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written');
    })
});

app.get("/hi", (req, res) => {
    res.sendFile(path.join(__dirname, "public/hi.html"));
});

app.listen(8080, () => {
    console.log("Server listening at http://localhost:8080!")
});


