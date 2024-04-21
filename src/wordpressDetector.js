const axios = require('axios');
const cheerio = require('cheerio');

async function wordpressDetector(url) {
  try {
    // Отправляем HEAD запрос к указанному URL, чтобы получить только заголовки ответа
    const response = await axios.head(url);

    // Проверяем заголовок "x-powered-by" на наличие указания на WordPress
    if (response.headers['x-powered-by'] && response.headers['x-powered-by'].toLowerCase().includes('wordpress')) {
      return true;
    }

    // Если заголовок не содержит указание на WordPress, загружаем HTML страницы для дополнительной проверки
    const htmlResponse = await axios.get(url);
    const html = htmlResponse.data;

    // Используем Cheerio для загрузки HTML кода
    const $ = cheerio.load(html);

    // Проверяем наличие мета-тега "generator", характерного для WordPress
    const generatorMetaTag = $('meta[name="generator"]');
    if (generatorMetaTag && generatorMetaTag.attr('content') && generatorMetaTag.attr('content').toLowerCase().includes('wordpress')) {
      return true;
    }

    // Если ни один из признаков не найден, считаем, что сайт не реализован на WordPress
    return false;
  } catch (error) {
    throw new Error('Failed to fetch URL');
  }
}

module.exports = wordpressDetector;
