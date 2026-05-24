const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Timestamp Microservice funcionando");
});

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

app.get("/api", (req, res) => {
  res.json(getDateResponse());
});

app.get("/api/:date", (req, res) => {
  res.json(getDateResponse(req.params.date));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor funcionando en puerto " + listener.address().port);
});