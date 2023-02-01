// console.log(123);

const puppeteer = require('puppeteer');
const fs = require('fs');


async function run()  {
    const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('https://developer.chrome.com/');
    const page = await browser.newPage();
    await page.goto('https://traversymedia.com');
    
    // screenshot // await page.screenshot({path: 'example.png', fullPage: true});
    // pdf // await page.pdf({path: 'deneme.pdf', format: 'a4'});
    // const html = await page.content();
    // html code // console.log(html);

    // const title = await page.evaluate(()=>document.title);
    // console.log(title)

    // const text = await page.evaluate(()=>document.body.innerText);
    // console.log(text)

    // const links = await page.evaluate(()=>Array.from(document.querySelectorAll('a'), (e)=> e.href));
    // console.log(links)

    // const courses = await page.evaluate(()=>
    // Array.from(document.querySelectorAll('#courses .card'), (e)=> ({
    //     title: e.querySelector('.card-body h3').innerText,
    //     level: e.querySelector('.card-body .level').innerText,
    //     url: e.querySelector('.card-footer a').href,
    //     promo: e.querySelector('.card-footer .promo-code .promo').innerText,



    // })));
    // console.log(courses)

    const courses = await page.$$eval('#courses .card', (element)=> element.map(e => ({
         title: e.querySelector('.card-body h3').innerText,
         level: e.querySelector('.card-body .level').innerText,
         url: e.querySelector('.card-footer a').href,
        promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    })));


     console.log(courses)

     // save json
     fs.writeFile('courses.json', JSON.stringify(courses), (err)=> {
        if(err) {
          console.error(err);
        } else {
          console.log('file saved');
        }
      });
      


    await browser.close();
}


run();