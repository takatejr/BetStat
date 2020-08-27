const express = require("express");
const puppeteer = require("puppeteer");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

URL_FS = "https://www.flashscore.co.uk";

async function scrapeProduct() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL_FS);

  // Leagues TODO
  const leagues = await page.$$eval("span.event__title--name", (res) =>
    res.map((el) => el.getAttribute("title")),
  );
  // const leagues = await page.$$eval('div.sportName.soccer > *', (res) => res.map(el => el.getAttribute('title')));



  // Basic data
  const home = await page.$$eval(".event__participant--home", (res) =>
    res.map((el) => el.textContent),
  );
  const away = await page.$$eval(".event__participant--away", (res) =>
    res.map((el) => el.textContent),
  );
  const notSplittedIds = await page.$$eval(
    "div.sportName.soccer > div.event__match",
    (res) => res.map((el) => el.getAttribute("id")),
  );


  
  ids = [];

  for (let i = 0; i < notSplittedIds.length; i++) {
    ids.push(notSplittedIds[i].toString().split("_")[2]);
  }

  // Status or time
  // const start = await page.$$eval('div.event__check + div', (res) => res.map(el => el.textContent)); to variable datas

  arr = [];

  for (let i = 0; i < home.length; i++) {
    arr.push({
      home: home[i],
      away: away[i],
      matchID: ids[i],
    });
  }

  return arr;
}

// place holder for the data
let matches = [];
const users = [];

app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  console.log("GetALLUSERS");
  console.log(matches);
  res.json(users);
});

app.post("/api/user", (req, res) => {
  const user = req.body.user;
  console.log("Adding user::::::::", user);
  users.push(user);
  res.json("user addedd");
});

app.get("/api/betdata", (req, res) => {
  const scraper = scrapeProduct().then((arr) => (matches = arr));
  res.json("scraped");
  console.log("POBRANO");
});

app.get("/api/betdatas", (req, res) => {
  console.log("GetBETDATAS");
  console.log(matches);
  moreDetailedMatch();
  res.json(matches);
});

app.get("/", (req, res) => {
  res.send("App Works !!!!");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

async function moreDetailedMatch() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const undefineds = [];


  // Advanced data flashscore
  for (let { matchID: ID } of matches) {
    arrx = [];

    await page.goto(URL_FS + "/match/" + ID + "/#h2h;overall");

    for (let i = 0; i < 10; i++) {
      const [ee] = await page.$x(`//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[${i}]/td[6]/a`);

      if (ee == undefined) {
        undefineds.push(ID);
      } else {
        const getMe = await ee.getProperty("title");
        const getMeResult = await getMe.jsonValue();
        console.log({ getMeResult, ID });
        arrx.push(ee);
      }
    }

  }
  // console.log(undefineds)
  browser.close();
}
