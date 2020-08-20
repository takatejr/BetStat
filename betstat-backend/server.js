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

  console.log({srctext})
}

const scraper = scrapeProduct('https://www.flashscore.co.uk');

// place holder for the data
const bettdata = [];
const users = [];

app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  console.log("api/users called!!!!");
  console.log(bettdata)
  res.json(users);
});

app.post("/api/user", (req, res) => {
  const user = req.body.user;
  console.log("Adding user::::::::", user);
  bettdata.push(scraper.then((resolve) => {
    console.log('hehehe');
    console.log(resolve)
    return resolve
  }))
  users.push(user);
  res.json("user addedd");
});



// app.post("/api/betdata", (req, res) => {
//   const betdata = scraper;
//   console.log(req)
//   console.log(betdata);
//   betdatas.push(betdata)
//   res.json('pobrałem dane ziomek')
// })

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
