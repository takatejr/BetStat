const express = require("express");
const puppeteer = require("puppeteer");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;



async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const [el] = await page.$x('//*[@id="live-table"]/div[2]/div/div/div[1]/div[2]');
  const src = await el.getProperty('title');
  const srctext = await src.jsonValue();

  return srctext
}

// place holder for the data
const matches = [];
const users = [];

app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  console.log("GetALLUSERS");
  console.log(matches)
  res.json(users);
});

app.post("/api/user", (req, res) => {
  const user = req.body.user;
  console.log("Adding user::::::::", user);
  users.push(user);
  res.json("user addedd");
});


app.get("/api/betdata", (req, res) => {
  const scraper = scrapeProduct('https://www.flashscore.co.uk');
  matches.push(scraper)
  console.log(scraper);
  res.json('scraped')
});

app.get("/api/betdatas", (req, res) => {
  console.log("GetBETDATAS");
  console.log(matches)
  res.json(matches);
});

// app.get("/api/betdatas", (req, res) => {
//   console.log("api/betdatas called!!!!");
//   res.json(betdatas);
// });









app.get("/", (req, res) => {
  res.send("App Works !!!!");
});





app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
