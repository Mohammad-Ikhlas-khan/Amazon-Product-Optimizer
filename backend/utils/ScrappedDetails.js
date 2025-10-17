const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");


const ScrappedDetails=async ({asin}) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

    const page = await browser.newPage();
    await page.goto(`https://www.amazon.in/dp/${asin}`);
    
    let data={};
    try{
        const el=await page.$('#productTitle');
        const title=el? (await el.evaluate(node=>node.textContent.trim())):null;
        data.title=title;
        console.log(data.title);
    }
    catch(err){
        console.error('Error fetching product details:', err);
    }

   try{
       const el = await page.$('ul.a-unordered-list.a-vertical.a-spacing-mini,ul.a-unordered-list.a-vertical.a-spacing-small');

        const bullets=el? (await el.evaluate(node=>Array.from(node.querySelectorAll('li')).map(li=>li.textContent.trim()))):null;
        data.bullets=bullets;
        console.log(data.bullets);
    }
    catch(err){
        console.error('Error fetching product details:', err);
    }

    try{
        const el=await page.$('#productDescription');
        const description=el? (await el.evaluate(node=>node.textContent.trim())):null;
        data.description=description;
        console.log(data.description);
    }
    catch(err){
        console.error('Error fetching product details:', err);
    }
    
    if(data.title && data.bullets && data.description){
        return data;
    }
    else{
        throw new Error('Failed to fetch all product details');
    }

    //await browser.close();
};

module.exports=ScrappedDetails;
