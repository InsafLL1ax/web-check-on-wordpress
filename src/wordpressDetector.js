const axios = require('axios');
const cheerio = require('cheerio');

async function wordpressDetector(url) {
  try {
    // Отправляем GET запрос к указанному URL для загрузки всего HTML содержимого страницы
    const htmlResponse = await axios.get(url);
    const html = htmlResponse.data;

    // Используем Cheerio для загрузки HTML кода
    const $ = cheerio.load(html);

    // Проверяем наличие мета-тега "generator" с содержимым, указывающим на WordPress
    const generatorMetaTag = $('meta[name="generator"]');
    if (generatorMetaTag.length > 0) {
      const content = generatorMetaTag.attr('content');
      if (content && content.toLowerCase().includes('wordpress')) {
        console.log('WordPress detected from meta generator tag');
        return true;
      }
    }

    // Проверяем наличие определенных классов HTML, характерных для WordPress
    const wordpressClasses = ['.wp-content', '.wp-block'];
    for (const wordpressClass of wordpressClasses) {
      const elements = $(wordpressClass);
      if (elements.length > 0) {
        console.log(`WordPress detected from ${wordpressClass}`);
        return true;
      }
    }

    // Если ни один из признаков не найден, считаем, что сайт не реализован на WordPress
    console.log('WordPress not detected');
    return false;
  } catch (error) {
    console.error('Failed to fetch URL:', error);
    throw new Error('Failed to fetch URL');
  }
}

module.exports = wordpressDetector;
