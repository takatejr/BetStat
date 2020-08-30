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

  // home vs away
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
      id: i,
      home: home[i],
      away: away[i],
      matchID: ids[i],
      homeLastMatches: [],
      awayLastMatches: [],
    });
  }

  return arr;
}

// place holder for the data
let matches = [];
const users = [];
const scrapedMoreDetailed = [];

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
  scrapeProduct().then((arr) => (matches = arr));
  console.log(`Sprawdzam czy dziś coś grają`);
  res.json("scraped");
});

app.get("/api/betdatas", (req, res) => {
  console.log(
    `Wyświetlanie wszystkich ${matches.length} rozgrywanych dzisiaj meczy`,
  );
  res.json(matches);
});

app.post("/api/matchID", (req, res) => {
  const lastMatchID = req.body.currentID;
  console.log(`POBRANO MECZ O ID = ${lastMatchID}, ZACZYNAM WYKONYWAC DALSZE POBIERANIE`);
  if(!scrapedMoreDetailed.includes(lastMatchID)){
    console.log('działa ten if')
  moreDetailedMatch(lastMatchID);
  scrapedMoreDetailed.push(lastMatchID);
  } else {
    console.clear();
    console.log("juz jest to ID")
  }
  res.json(matches)
});

app.get("/", (req, res) => {
  res.send("App Works !!!!");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

async function moreDetailedMatch(ID) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const undefineds = [];

  await page.goto(URL_FS + "/match/" + ID + "/#h2h;overall");

  for (let i = 0; i < 7; i++) {
    const [home] = await page.$x(`//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[${i}]/td[6]/a`);
    const [away] = await page.$x(`//*[@id="tab-h2h-overall"]/div[2]/table/tbody/tr[${i}]/td[6]/a`);

    if (home == undefined || away == undefined) {
      undefineds.push(ID);
    } else {
      const homeTitles = await home.getProperty("title");
      const awayTitles = await away.getProperty("title");

      const homeLastMatches = await homeTitles.jsonValue();
      const awayLastMatches = await awayTitles.jsonValue();
      
      for (const match of matches) {
        if (match.matchID == ID) {
          match.awayLastMatches.push(awayLastMatches);
          match.homeLastMatches.push(homeLastMatches)
        }
      }
    }
  }
  console.log("dobra zrobione")
    browser.close();
  }


// async function moreDetailedMatch() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const undefineds = [];

//   // Advanced data flashscore
//   for (let { matchID: ID } of matches) {
//     arrx = [];

//     await page.goto(URL_FS + "/match/" + ID + "/#h2h;overall");
//     // console.log(matches)

//     for (let i = 0; i < 7; i++) {
//       const [home] = await page.$x(`//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[${i}]/td[6]/a`);
//       const [away] = await page.$x(`//*[@id="tab-h2h-overall"]/div[2]/table/tbody/tr[${i}]/td[6]/a`);

//       if (home == undefined || away == undefined) {
//         undefineds.push(ID);

//       } else {
//         const homeTitles = await home.getProperty("title");
//         const awayTitles = await away.getProperty("title");

//         const homeLastMatches = await homeTitles.jsonValue();
//         const awayLastMatches = await awayTitles.jsonValue();

//         console.log({ homeLastMatches, ID });
//         console.log({ awayLastMatches, ID });
//       }
//     }
//   }
//   console.log(undefineds)
//   browser.close();
// }
