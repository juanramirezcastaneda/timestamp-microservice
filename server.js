var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({ optionSuccessStatus: 200 }));

const port = process.env.PORT || "8000";


app.get("/api/timestamp/:date_string([0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}-[0-9]{2}-[0-9]{4}|[0-9]{13})?", (req, res, next) => {
    const { date, month } = parseDateFromRegex(req.params.date_string);
    if (month > 12 || month < 1) { next(); }
    console.info(newDateObject);
    if (date.getMonth() !== month) { next(); }

    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});

app.get('*', (req, res) => res.json({ "error": "Invalid Date" }));

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

function parseDateFromRegex(dateString) {
    const regexForDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})|([0-9]{2})-([0-9]{2})-([0-9]{4})|[0-9]{13}/;
    const result = dateString.match(regexForDate);
    let day, month, year, unixDate;

    if (result[1] && result[1].length === 4) {
        year = Number(result[1]);
        // To ensure index for month
        month = Number(result[2] - 1);
        day = Number(result[3]);
        return { date: new Date(year, month, day), day, month, year };
    }

    if (result[4] && result[4].length === 2) {
        year = Number(result[6]);
        // To ensure index for month
        month = Number(result[5] - 1);
        day = Number(result[4]);
        return { date: new Date(year, month, day), day, month, year };
    }

    if (result[7]) {
        unixDate = Number(result[7]);
        return { date: new Date(unixDate), day, month, year };
    }

    return { date: new Date(), day, month, year };
}