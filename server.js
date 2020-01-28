var express = require('express');
var app = express();

const port = process.env.PORT || "8000";

app.get("/api/timestamp/:date_string([0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}-[0-9]{2}-[0-9]{4})", (req, res) => {

    const newDateObject = parseDateFromRegex(req.params.date_string)
    const newDate = new Date(newDateObject.year, newDateObject.month, newDateObject.day);

    res.json({ "unix": newDate.getTime(), "utc": newDate.toUTCString() })
});

app.get('*', (req, res) => res.json({ "error": "Invalid Date" }));

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

function parseDateFromRegex(dateString) {
    const regexForDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})|([0-9]{2})-([0-9]{2})-([0-9]{4})/;
    const result = dateString.match(regexForDate);
    let day, month, year;

    if (result[1] && result[1].length === 4) {
        year = Number(result[1]);
        month = Number(result[2]);
        day = Number(result[3]);
    }

    if (result[4] && result[4].length === 2) {
        year = Number(result[6]);
        month = Number(result[5]);
        day = Number(result[4]);
    }

    return { day, month, year };
}