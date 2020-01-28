var express = require('express');
var app = express();

const port = process.env.PORT || "8000";

app.get("/api/timestamp/:date_string([0-9]{4}-[0-9]{2}-[0-9]{2}||[0-9]{2}-[0-9]{2}-[0-9]{4})", (req, res) => {

    const newDate = parseDateFromRegex(req.params.date_string)

    console.log(newDate);
    res.status(200).send(`Timestamp service: ${req.params.date_string}`);
});

app.get('*', (req, res) => res.json({ "error": "Invalid Date" }));

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

function parseDateFromRegex(dateString) {
    const regexForDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})|([0-9]{2})-([0-9]{2})-([0-9]{4})/;

    const result = dateString.match(regexForDate);
    let day, month, year;
    console.log(result);
    if (result[1] && result[1].length === 4) {
        year = Number(result[1]);
        month = Number(result[2]);
        day = Number(result[3]);
    }

    return { day, month, year };
}