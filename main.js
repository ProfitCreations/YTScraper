const puppeteer = require('puppeteer');
const creds = require('./creds.js');
const colors = require('colors');

(async() => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	console.log("| Starting ..." .cyan);
	
	await page.goto('https://youtube.com');
	
	// await page.waitForSelector('#buttons > ytd-button-renderer.style-scope.ytd-masthead.style-brand > a');
	await page.click('#buttons > ytd-button-renderer.style-scope.ytd-masthead.style-brand > a');
	console.log('| clicked btn' .cyan);

	await page.waitForSelector('#identifierId');
	console.log('| waited for #identifierId' .cyan);

	await page.focus('#identifierId')
	console.log('| focus' .cyan);
	console.log('| url is -> ', await page.url() .cyan);
	await page.type(creds.username, {delay: 100});
	await page.click('#identifierNext', {"waitUntil" : "networkidle"});
	// await page.press('Enter', {"waitUntil" : "networkidle"});
	console.log('| clicked next' .cyan);

	await page.waitForSelector("input");
	await page.focus('input');
	console.log('|| waited for selector');

	await page.type(creds.password);
	console.log('|| typed password' .red.bold);

	console.log("| =================" .cyan);
	console.log("| Continue coding" .cyan);
	console.log("| =================" .cyan);
	



})();
