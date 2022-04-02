import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello My friend!");
});

app.listen(process.env.PORT || 8080);
