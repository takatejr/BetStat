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
  
  const aaa = await page.$x(console.log())

  const leagues = await page.$$eval('.event__title--name', (res) => res.map(el => el.getAttribute('title')));
  // const leagues = await page.$$eval('div.sportName.soccer > *', (res) => res.map(el => el.getAttribute('title')));
  const ids = await page.$$eval('div.sportName.soccer > div.event__match', (res) => res.map(el => el.getAttribute('id')))

  arr = [];

  for(let league of leagues) {
    // if(null != league) {
      arr.push(league);
    // }
  }

  arrids = [];

  for(let i = 0; i < ids.length; i++){
    arrids.push({nr: i, id: ids[i]})
  }

  console.log(arr)
  console.log(arrids)

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
  const scraper = scrapeProduct('https://www.flashscore.co.uk').then((res_) => matches.push({league: res_}));
  console.log(scraper);
  res.json('scraped')
});

app.get("/api/betdatas", (req, res) => {
  console.log("GetBETDATAS");
  console.log(matches)
  res.json(matches);
});

app.get("/", (req, res) => {
  res.send("App Works !!!!");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
