const express = require("express")
const puppeteer = require("puppeteer")
const app = express(),
  bodyParser = require("body-parser")
port = 3080

URL_FS = "https://www.flashscore.co.uk"

const sleep = (howManyTime) =>
  new Promise((resolve) => setTimeout(resolve, howManyTime))

function waitForResponse(howManyTime) {
  const data1 = new Date().getSeconds()
  sleep(howManyTime)
  const data2 = new Date().getSeconds()
  console.log(
    data1 < data2
      ? console.log(data2 - data1 + "s")
      : console.log(data1 - data2 + "s")
  )
}

async function scrapeProduct() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(URL_FS)

  // Leagues TODO
  // const leagues = await page.$$eval("span.event__title--name", (res) =>
  //   res.map((el) => el.getAttribute("title")),
  // );

  // home vs away
  const home = await page.$$eval(".event__participant--home", (res) =>
    res.map((el) => el.textContent)
  )

  const away = await page.$$eval(".event__participant--away", (res) =>
    res.map((el) => el.textContent)
  )

  const notSplittedIds = await page.$$eval(
    "div.sportName.soccer > div.event__match",
    (res) => res.map((el) => el.getAttribute("id"))
  )

  ids = []

  for (let i = 0; i < notSplittedIds.length; i++) {
    ids.push(notSplittedIds[i].toString().split("_")[2])
  }

  // Status or time
  // const start = await page.$$eval('div.event__check + div', (res) => res.map(el => el.textContent)); to variable datas

  arr = []

  for (let i = 0; i < home.length; i++) {
    arr.push({
      id: i,
      home: home[i],
      away: away[i],
      matchID: ids[i],
      homeLastMatches: [],
      awayLastMatches: [],
      homeStats: [],
      awayStats: [],
      h2h: [],
    })
  }

  return arr
}

// place holder for the data
let matches = []
const users = []
const scrapedMoreDetailed = []

app.use(bodyParser.json())

app.get("/api/users", (req, res) => {
  console.log("GetALLUSERS")
  console.log(matches)
  res.json(users)
})

app.post("/api/user", (req, res) => {
  const user = req.body.user
  users.push(user)
  res.json("user addedd")
})

app.get("/api/betdata", (req, res) => {
  scrapeProduct().then((arr) => (matches = arr))
  console.log(`Sprawdzam czy dziś coś grają`)
  res.json("scraped")
})

app.get("/api/betdatas", (req, res) => {
  console.log(`Wyświetlanie wszystkich ${matches.length} rozgrywanych dzisiaj meczy`)
  res.json(matches)
})

app.post("/api/matchID", (req, res) => {
  const lastMatchID = req.body.currentID

  console.log(
    `POBRANO MECZ O ID = ${lastMatchID}, ZACZYNAM WYKONYWAC DALSZE POBIERANIE`
  )

  if (!scrapedMoreDetailed.includes(lastMatchID)) {
    winLose(lastMatchID)
    // seasonScore(lastMatchID)
    scrapedMoreDetailed.push(lastMatchID)
  } else {
    console.clear()
    console.log("To ID zostało już użyte")
  }
  res.json(matches)
})

async function winLose(ID) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(URL_FS + "/match/" + ID + "/#h2h;overall")

  for (let i = 0; i < 6; i++) {
    const [homeMatches] = await page.$x(`//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[${i}]/td[6]/a`)
    const [homeScores] = await page.$x(`//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[${i}]/td[5]/span/strong`)
    const [awayMatches] = await page.$x(`//*[@id="tab-h2h-overall"]/div[2]/table/tbody/tr[${i}]/td[6]/a`)
    const [awayScores] = await page.$x(`//*[@id="tab-h2h-overall"]/div[2]/table/tbody/tr[${i}]/td[5]/span/strong`)

    const [h2hHome] = await page.$x(`//*[@id="tab-h2h-overall"]/div[3]/table/tbody/tr[${i}]/td[3]/span`)
    const [h2hAway] = await page.$x(`//*[@id="tab-h2h-overall"]/div[3]/table/tbody/tr[${i}]/td[4]/span`)
    const [scores] = await page.$x(`//*[@id="tab-h2h-overall"]/div[3]/table/tbody/tr[${i}]/td[5]/span/strong`)

    if (homeMatches !== undefined || awayMatches !== undefined || h2hAway !== undefined || h2hHome !== undefined || scores !== undefined || homeScores !== undefined || awayScores !== undefined
    ) {
      const homeLastMatches = await (await homeMatches.getProperty("title")).jsonValue()      
      const homeLastScores = await (await homeScores.getProperty("textContent")).jsonValue()
      const awayLastMatches = await (await awayMatches.getProperty("title")).jsonValue()
      const awayLastScores = await (await awayScores.getProperty("textContent")).jsonValue()

      const h2hHomeText = await (
        await h2hHome.getProperty("textContent")
      ).jsonValue()
      const h2hAwayText = await (
        await h2hAway.getProperty("textContent")
      ).jsonValue()
      const score = await (await scores.getProperty("textContent")).jsonValue()

      for (const match of matches) {
        if (match.matchID == ID) {
          match.awayLastMatches.push([awayLastMatches, homeLastScores])
          match.homeLastMatches.push([homeLastMatches, awayLastScores])
          match.h2h.push({h2hHomeText, h2hAwayText, score})
        }
      }
    }
  }
  browser.close()
}

async function seasonScore(ID) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(URL_FS + "/match/" + ID + "/#standings")
  await page.waitForSelector(".rows___1vntYow > div")
  const countTeams = await page.$$eval(".rows___1vntYow > div", (div) => div.length)
  arr = []

  if (countTeams > 1) {
    console.log(countTeams)
    for (let i = 1; i < countTeams; i++) {
      const [win] = await page.$x(
        `//*[@id="tournament-table"]/div[3]/div[1]/div/div/div[2]/div[${i}]/span[2]`
      )
      const [draw] = await page.$x(
        `//*[@id="tournament-table"]/div[3]/div[1]/div/div/div[2]/div[${i}]/span[3]`
      )
      const [lose] = await page.$x(
        `//*[@id="tournament-table"]/div[3]/div[1]/div/div/div[2]/div[${i}]/span[4]`
      )
      const [goals] = await page.$x(
        `//*[@id="tournament-table"]/div[3]/div[1]/div/div/div[2]/div[${i}]/span[5]`
      )
      const [points] = await page.$x(
        `//*[@id="tournament-table"]/div[3]/div[1]/div/div/div[2]/div[${i}]/span[6]`
      )

      // console.log('wykonuje sie ten blok' + i)
    }
  }

  browser.close()
  // matches.push(arx)
}

app.get("/", (req, res) => {
  res.send("App Works !!!!")
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
