const puppeteer = require('puppeteer');
const { match } = require('assert');

const sleep = howManyTime => new Promise(resolve => setTimeout(resolve, howManyTime));

function waitForResponse() {
    const data1 = new Date().getSeconds();
    console.log(data1);
    sleep(5000);
    console.log('5s waiting')
};

// function test() {
//     sleep(1000).then(() => {
//         console.log('hey')
//     })
// }

export async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const [el] = await page.$x('//*[@id="live-table"]/div[2]/div/div/div[1]/div[2]');
    const src = await el.getProperty('title');
    const srctext = await src.jsonValue();

    console.log({srctext})

    const [el1] = await page.$x('//*[@id="g_1_t8e2jfoB"]');
    const matchId = await el1.getProperty('id');
    const matchedIt = await matchId.jsonValue();
    const idForOpenWindow = await matchedIt.toString().split('_')[2];
    await page.goto(url + '/match/' + idForOpenWindow + '/#h2h;overall') 

    const [winDrawLose] = await page.$x('//*[@id="tab-h2h-overall"]/div[1]/table/tbody/tr[1]/td[6]/a');
    const getMe = await winDrawLose.getProperty('title')
    const getMeWynik = await getMe.jsonValue();

    console.log({getMeWynik})

    browser.close();
}

scrapeProduct('https://www.flashscore.co.uk')

