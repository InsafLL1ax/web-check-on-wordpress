const axios = require('axios');
const cheerio = require('cheerio');

async function wordpressDetector(url) {
  try {
    // Отправляем GET запрос к указанному URL для загрузки всего HTML содержимого страницы
    const htmlResponse = await axios.get(url);
    const html = htmlResponse.data;

    // Используем Cheerio для загрузки HTML кода
    const $ = cheerio.load(html);

    // Проверяем наличие мета-тега "generator", характерного для WordPress
    const generatorMetaTag = $('meta[name="generator"]');
    if (generatorMetaTag && generatorMetaTag.attr('content') && generatorMetaTag.attr('content').toLowerCase().includes('wordpress')) {
      console.log('WordPress detected from meta generator tag');
      return true;
    }

    // Проверяем наличие определенного класса HTML, характерного для WordPress
    const wordpressClass = $('.wp-content');
    if (wordpressClass.length > 0) {
      console.log('WordPress detected from wp-content class');
      return true;
    }

    // Если ни один из признаков не найден, считаем, что сайт не реализован на WordPress
    console.log('WordPress not detected');
    return false;
  } catch (error) {
    throw new Error('Failed to fetch URL');
  }
}

module.exports = wordpressDetector;
