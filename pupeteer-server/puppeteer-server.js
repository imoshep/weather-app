const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const port = 8181;

const app = express(); 

app.use(cors());
app.use(express.json())
app.get('/google', async (req, res) => {
    const query = req.query.city.replace(' ', '+');
    console.log(query);
    const url = `https://www.google.com/search?q=weather+${query}`
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    await page.goto(url);
    await page.screenshot({path: './screenshot.jpeg', type: 'jpeg'})

    try {
        const id = Math.random();
        const iconSrc = await getElement(page, '//*[@id="wob_tci"]', 'src');
        const location = await getElement(page, '//*[@id="wob_loc"]', 'textContent');
        const sampledAtDayHour = await getElement(page, '//*[@id="wob_dts"]', 'textContent');
        const currentTempCelsius = await getElement(page, '//*[@id="wob_tm"]', 'textContent');
        const verbalDesc = await getElement(page, '//*[@id="wob_dc"]', 'textContent');
        const precipitation = await getElement(page, '//*[@id="wob_pp"]', 'textContent');
        const humidity = await getElement(page, '//*[@id="wob_hm"]', 'textContent');
        const windSpeed = await getElement(page, '//*[@id="wob_ws"]', 'textContent');
        res.send({success: true, data: {id,iconSrc, location, sampledAtDayHour, currentTempCelsius, verbalDesc, precipitation, humidity, windSpeed}})
    } catch(error) {
        res.status(404).send({success: false, data: error.message})
    }
    browser.close();
    
    // res.send('okay');
})


app.listen(port, ()=>console.log(`listening on port ${port}`));

async function getElement(page, xpath, property) {
    // This works even if we dont pass page as an argument, because of closures, but for the sake of functional purity (e.g. in the case of using this function in another scope that hadn't already declared page) I decidet to require passing it in. It also assits for sepecificity needs (e.g. when several pages are being scraped).
    const [el] = await page.$x(xpath);
    const elRaw = await el.getProperty(property);
    const value = await elRaw.jsonValue();
    return value;
}