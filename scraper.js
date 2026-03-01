const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=72", // Replace with actual base URLs
  "https://sanand0.github.io/tdsdata/js_table/?seed=73",
  "https://sanand0.github.io/tdsdata/js_table/?seed=74",
  "https://sanand0.github.io/tdsdata/js_table/?seed=75",
  "https://sanand0.github.io/tdsdata/js_table/?seed=76",
  "https://sanand0.github.io/tdsdata/js_table/?seed=77",
  "https://sanand0.github.io/tdsdata/js_table/?seed=78",
  "https://sanand0.github.io/tdsdata/js_table/?seed=79",
  "https://sanand0.github.io/tdsdata/js_table/?seed=80",
  "https://sanand0.github.io/tdsdata/js_table/?seed=81"
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    try {
      await page.goto(url);
      
      // Selects all numbers within table cells
      const cellValues = await page.$$eval('td', cells => 
        cells.map(cell => {
            const num = parseFloat(cell.innerText.replace(/[^0-9.-]+/g, ""));
            return isNaN(num) ? 0 : num;
        })
      );

      const pageSum = cellValues.reduce((a, b) => a + b, 0);
      grandTotal += pageSum;
      
      console.log(`URL: ${url} | Page Sum: ${pageSum}`);
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error.message);
    }
  }

  console.log('-------------------------------------------');
  console.log(`FINAL TOTAL SUM: ${grandTotal}`);
  console.log('-------------------------------------------');

  await browser.close();
})();
