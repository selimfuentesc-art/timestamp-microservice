const express = require("express");
const app = express();

function getDateResponse(dateInput) {
  let date;

  if (!dateInput) {
    date = new Date();
  } else if (/^\d+$/.test(dateInput)) {
    date = new Date(Number(dateInput));
  } else {
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

app.get("/", (req, res) => {
  res.json(getDateResponse());
});

app.get("/:date", (req, res) => {
  res.json(getDateResponse(req.params.date));
});

module.exports = app;