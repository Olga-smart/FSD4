// import * as puppeteer from 'puppeteer';
// // import * as regeneratorRuntime from 'regenerator-runtime';

// describe('View', function() {

//   describe('setLeftValue(value) - Puppeteer', function() {

//     it('when left thumb is being dragged, value of left input is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const inputValueBefore = await page.evaluate('document.querySelector(".range-slider__input_left").getAttribute("value")');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const box = await leftThumb!.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 100, y);
//       await page.mouse.up();
//       const inputValueAfter = await page.evaluate('document.querySelector(".range-slider__input_left").getAttribute("value")');
//       expect(inputValueBefore).not.toBe(inputValueAfter);
//       await browser.close();
//     });

//     it('when left thumb is being dragged, it`s position is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const boxBefore = await leftThumb?.boundingBox();
//       const x = boxBefore!.x + boxBefore!.width / 2;
//       const y = boxBefore!.y + boxBefore!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 100, y);
//       await page.mouse.up();
//       const boxAfter = await leftThumb?.boundingBox();
//       expect(boxBefore!.x).not.toBe(boxAfter!.x);
//       await browser.close();
//     });

//     it('when left thumb is being dragged, position of left value label is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const leftValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const box = await leftThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 100, y);
//       await page.mouse.up();
//       const leftValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
//       expect(leftValueLabelPositionBefore).not.toBe(leftValueLabelPositionAfter);
//       await browser.close();
//     }, 10000);

//     it('when left thumb is being dragged, text in left value label is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const leftValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const box = await leftThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 100, y);
//       await page.mouse.up();
//       const leftValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
//       expect(leftValueLabelTextBefore).not.toBe(leftValueLabelTextAfter);
//       await browser.close();
//     }, 10000);

//     it('when 2 value labels get too close, they merge', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
//       let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const box = await leftThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 150, y);
//       await page.mouse.up();
//       expect(leftValueLabelOpacity).toBe('0');
//       expect(commonValueLabelOpacity).toBe('1');
//       await browser.close();
//     }, 10000);

//     // TODO: не работает тест
//     it('when 2 value labels get too close and then get too far, they split', async function() {
//       // const browser = await puppeteer.launch();
//       // const page = await browser.newPage();
//       // await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       // const leftThumb = await page.$('.range-slider__thumb_left');
//       // const box = await leftThumb.boundingBox();
//       // const x = box.x + box.width / 2;
//       // const y = box.y + box.height / 2;
//       // await page.mouse.move(x, y);
//       // await page.mouse.down();
//       // await page.mouse.move(x + 150, y);
//       // await page.mouse.up();
//       // await page.mouse.down();
//       // await page.mouse.move(x, y);
//       // await page.mouse.up();
//       // const leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
//       // const commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
//       // expect(leftValueLabelOpacity).toBe('1');
//       // expect(commonValueLabelOpacity).toBe('0');
//       // await browser.close();
//     }, 10000);

//     it('when left value label gets too close to min label, min label hides', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const leftThumb = await page.$('.range-slider__thumb_left');
//       const box = await leftThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 50, y);
//       await page.mouse.up();
//       const minLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_left").style.opacity');
//       expect(minLabelOpacity).toBe('0');
//       await browser.close();
//     }, 10000);

//   });

//   describe('setRightValue(value) - Puppeteer', function() {

//     it('when right thumb is being dragged, value of right input is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const inputValueBefore = await page.evaluate('document.querySelector(".range-slider__input_right").getAttribute("value")');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const box = await rightThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 100, y);
//       await page.mouse.up();
//       const inputValueAfter = await page.evaluate('document.querySelector(".range-slider__input_right").getAttribute("value")');
//       expect(inputValueBefore).not.toBe(inputValueAfter);
//       await browser.close();
//     });

//     it('when right thumb is being dragged, it`s position is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const boxBefore = await rightThumb?.boundingBox();
//       const x = boxBefore!.x + boxBefore!.width / 2;
//       const y = boxBefore!.y + boxBefore!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 100, y);
//       await page.mouse.up();
//       const boxAfter = await rightThumb?.boundingBox();
//       expect(boxBefore!.x).not.toBe(boxAfter!.x);
//       await browser.close();
//     });

//     it('when right thumb is being dragged, position of right value label is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const rightValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const box = await rightThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 100, y);
//       await page.mouse.up();
//       const rightValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
//       expect(rightValueLabelPositionBefore).not.toBe(rightValueLabelPositionAfter);
//       await browser.close();
//     }, 10000);

//     it('when right thumb is being dragged, text in right value label is being changed', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const rightValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const box = await rightThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 100, y);
//       await page.mouse.up();
//       const rightValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
//       expect(rightValueLabelTextBefore).not.toBe(rightValueLabelTextAfter);
//       await browser.close();
//     }, 10000);

//     it('when 2 value labels get too close, they merge', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       let rightValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_right").style.opacity');
//       let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const box = await rightThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x - 150, y);
//       await page.mouse.up();
//       expect(rightValueLabelOpacity).toBe('0');
//       expect(commonValueLabelOpacity).toBe('1');
//       await browser.close();
//     }, 10000);

//     // TODO: не работает тест
//     it('when 2 value labels get too close and then get too far, they split', async function() {
//       // const browser = await puppeteer.launch();
//       // const page = await browser.newPage();
//       // await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       // const leftThumb = await page.$('.range-slider__thumb_left');
//       // const box = await leftThumb.boundingBox();
//       // const x = box.x + box.width / 2;
//       // const y = box.y + box.height / 2;
//       // await page.mouse.move(x, y);
//       // await page.mouse.down();
//       // await page.mouse.move(x + 150, y);
//       // await page.mouse.up();
//       // await page.mouse.down();
//       // await page.mouse.move(x, y);
//       // await page.mouse.up();
//       // const leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
//       // const commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
//       // expect(leftValueLabelOpacity).toBe('1');
//       // expect(commonValueLabelOpacity).toBe('0');
//       // await browser.close();
//     }, 10000);

//     it('when right value label gets too close to max label, max label hides', async function() {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
//       const rightThumb = await page.$('.range-slider__thumb_right');
//       const box = await rightThumb?.boundingBox();
//       const x = box!.x + box!.width / 2;
//       const y = box!.y + box!.height / 2;
//       await page.mouse.move(x, y);
//       await page.mouse.down();
//       await page.mouse.move(x + 150, y);
//       await page.mouse.up();
//       const maxLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_right").style.opacity');
//       expect(maxLabelOpacity).toBe('0');
//       await browser.close();
//     }, 10000);

//   });

// }); 