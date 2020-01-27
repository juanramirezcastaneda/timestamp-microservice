var express = require('express');
var app = express();

const port = process.env.PORT || "8000";

app.get("/api/timestamp/:date_string([0-9]{4}-[0-9]{2}-[0-9]{2}||[0-9]{2}-[0-9]{2}-[0-9]{4})", (req, res) => {
    res.status(200).send(`Timestamp service: ${req.params.date_string}`);
});

app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});