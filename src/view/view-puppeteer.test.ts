import * as puppeteer from 'puppeteer';
import * as path from 'path';

describe('Horizontal slider', function() {

  describe('move left thumb', function() {

    it('when left thumb is being dragged, it`s position is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let boxBefore = await leftThumb?.boundingBox();
      let x = boxBefore!.x + boxBefore!.width / 2;
      let y = boxBefore!.y + boxBefore!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      let boxAfter = await leftThumb?.boundingBox();
      expect(boxBefore!.x).not.toBe(boxAfter!.x);
      await browser.close();
    }, 10000);

    it('when left thumb is being dragged, position of left value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      let leftValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
      expect(leftValueLabelPositionBefore).not.toBe(leftValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when left thumb is being dragged, text in left value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      let leftValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      expect(leftValueLabelTextBefore).not.toBe(leftValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 150, y);
      await page.mouse.up();
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close and then get too far, they split', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 150, y);
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await page.mouse.move(x, y);
      await page.mouse.up();
      leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('1');
      expect(commonValueLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

    it('when left value label gets too close to min label, min label hides', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 50, y);
      await page.mouse.up();
      let minLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_left").style.opacity');
      expect(minLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });

  describe('move right thumb', function() {

    it('when right thumb is being dragged, it`s position is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let boxBefore = await rightThumb?.boundingBox();
      let x = boxBefore!.x + boxBefore!.width / 2;
      let y = boxBefore!.y + boxBefore!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      let boxAfter = await rightThumb?.boundingBox();
      expect(boxBefore!.x).not.toBe(boxAfter!.x);
      await browser.close();
    });

    it('when right thumb is being dragged, position of right value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let rightValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      let rightValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
      expect(rightValueLabelPositionBefore).not.toBe(rightValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when right thumb is being dragged, text in right value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let rightValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      let rightValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      expect(rightValueLabelTextBefore).not.toBe(rightValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 150, y);
      await page.mouse.up();
      let rightValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_right").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(rightValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close and then get too far, they split', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_right');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 150, y);
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await page.mouse.move(x, y);
      await page.mouse.up();
      leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('1');
      expect(commonValueLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

    it('when right value label gets too close to max label, max label hides', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/horizontal/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 180, y);
      await page.mouse.up();
      let maxLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_right").style.opacity');
      expect(maxLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });

}); 

describe('Vertical slider', function() {

  describe('move left thumb', function() {

    it('when left thumb is being dragged, it`s position is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let boxBefore = await leftThumb?.boundingBox();
      let x = boxBefore!.x + boxBefore!.width / 2;
      let y = boxBefore!.y + boxBefore!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 100);
      await page.mouse.up();
      let boxAfter = await leftThumb?.boundingBox();
      expect(boxBefore!.y).not.toBe(boxAfter!.y);
      await browser.close();
    }, 10000);

    it('when left thumb is being dragged, position of left value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().y');
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 100);
      await page.mouse.up();
      let leftValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().y');
      expect(leftValueLabelPositionBefore).not.toBe(leftValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when left thumb is being dragged, text in left value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 100);
      await page.mouse.up();
      let leftValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      expect(leftValueLabelTextBefore).not.toBe(leftValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 150);
      await page.mouse.up();
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close and then get too far, they split', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 150);
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await page.mouse.move(x, y);
      await page.mouse.up();
      leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('1');
      expect(commonValueLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

    it('when left value label gets too close to min label, min label hides', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_left');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 60);
      await page.mouse.up();
      let minLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_left").style.opacity');
      expect(minLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });

  describe('move right thumb', function() {

    it('when right thumb is being dragged, it`s position is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let boxBefore = await rightThumb?.boundingBox();
      let x = boxBefore!.x + boxBefore!.width / 2;
      let y = boxBefore!.y + boxBefore!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 100);
      await page.mouse.up();
      let boxAfter = await rightThumb?.boundingBox();
      expect(boxBefore!.y).not.toBe(boxAfter!.y);
      await browser.close();
    });

    it('when right thumb is being dragged, position of right value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let rightValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().y');
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 100);
      await page.mouse.up();
      let rightValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().y');
      expect(rightValueLabelPositionBefore).not.toBe(rightValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when right thumb is being dragged, text in right value label is being changed', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let rightValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 100);
      await page.mouse.up();
      let rightValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      expect(rightValueLabelTextBefore).not.toBe(rightValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 150);
      await page.mouse.up();
      let rightValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_right").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(rightValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close and then get too far, they split', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let leftThumb = await page.$('.range-slider__thumb_right');
      let box = await leftThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 150);
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await page.mouse.move(x, y);
      await page.mouse.up();
      leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      expect(leftValueLabelOpacity).toBe('1');
      expect(commonValueLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

    it('when right value label gets too close to max label, max label hides', async function() {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(`file:${path.join(__dirname, 'pages-for-puppeteer/vertical/index.html')}`);
      let rightThumb = await page.$('.range-slider__thumb_right');
      let box = await rightThumb?.boundingBox();
      let x = box!.x + box!.width / 2;
      let y = box!.y + box!.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y - 220);
      await page.mouse.up();
      let maxLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_right").style.opacity');
      expect(maxLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });

}); 