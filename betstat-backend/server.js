const express = require("express");
const puppeteer = require("puppeteer");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;



async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);


  // Leagues TODO
  const leagues = await page.$$eval('span.event__title--name', (res) => res.map(el => el.getAttribute('title')));
  // const leagues = await page.$$eval('div.sportName.soccer > *', (res) => res.map(el => el.getAttribute('title')));


  // Basic data
  const home = await page.$$eval('.event__participant--home', (res) => res.map(el => el.textContent));
  const away = await page.$$eval('.event__participant--away', (res) => res.map(el => el.textContent));
  const notSplittedIds = await page.$$eval('div.sportName.soccer > div.event__match', (res) => res.map(el => el.getAttribute('id')))
  ids = [];

  for (let i = 0; i < notSplittedIds.length; i++){
    ids.push(notSplittedIds[i].toString().split('_')[2])
  }

  // Advanced data flashscore

  await page.goto(url + '/match/' + ids[1] + '/#h2h;overall')

  const [winDrawLose] = await page.$x('//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[1]/td[6]/a');
  const getMe = await winDrawLose.getProperty('title');
  const getMeWynik = await getMe.jsonValue();

  console.log({getMeWynik})

  page.goBack();
  
  for(let i = 0; i < ids.length; i++){
    await page.goto(url + '/match/' + ids[i] + '/#h2h;overall')

    const [winDrawLose] = await page.$x('//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[1]/td[6]/a');
    const getMe = await winDrawLose.getProperty('title');
    const getMeWynik = await getMe.jsonValue();
  
    console.log({getMeWynik})
  
    page.goBack();
  }

  // Status or time 
  // const start = await page.$$eval('div.event__check + div', (res) => res.map(el => el.textContent)); to variable datas


  //

  // await page.goto(url + '/match/' + idForOpenWindow + '/#h2h;overall') 


  arr = [];

  for(let i = 0; i < home.length; i++){
    arr.push({home: home[i], away: away[i], matchID: ids[i]})
  }

  return arr
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
  const scraper = scrapeProduct('https://www.flashscore.co.uk').then((res_) => matches.push(res_));
  res.json('scraped')
});

app.get("/api/betdatas", (req, res) => {
  console.log("GetBETDATAS");
  // console.log(matches)
  res.json(matches);
});

app.get("/", (req, res) => {
  res.send("App Works !!!!");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
