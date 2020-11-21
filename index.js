const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const SerialPort = require('serialport');
const port = new SerialPort('/dev/tty.usbmodem14201');

app.use(express.static('public'));
app.use(express.json());


// to static pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/sign", (req, res) => {
    res.sendFile(path.join(__dirname, "public/sign.html"));
});

app.get("/receive", (req, res) => {
    res.sendFile(path.join(__dirname, "public/receive.html"));
});

app.get("/draw", (req, res) => {
    res.sendFile(path.join(__dirname, "public/draw.html"));
});


// actual API calls
app.get("/move/:xy", async (req, res) => {
    let temp = req.params.xy.split(',');
    console.log(temp);
    x = temp[0];
    y = temp[1];
    port.write(`XM,1000,${x},${y}\r`, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written', x,y);
    })
});

app.listen(8080, () => {
    console.log("Server listening at http://localhost:8080!")
});


