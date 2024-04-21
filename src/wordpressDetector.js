const axios = require('axios');
/* global cheerio */

async function wordpressDetector(url) {
  try {
            // Отправляем GET запрос к указанному URL
            const response = await axios.get(url);
            const html = response.data;
    
            // Используем Cheerio для загрузки HTML кода
            const $ = cheerio.load(html);
    
            // Проверяем наличие мета-тега generator, характерного для WordPress
            const generatorMetaTag = $('meta[name="generator"]');
            if (generatorMetaTag && generatorMetaTag.attr('content')) {
                const content = generatorMetaTag.attr('content');
                if (content.includes('WordPress')) {
                    return true;
                }
            }
    
            // Проверяем наличие класса .wp-block, также характерного для WordPress
            const wpBlockClass = $('.wp-block');
            if (wpBlockClass.length > 0) {
                return true;
            }
    
            // Если ни один из признаков не найден, считаем, что сайт не реализован на WordPress

    return true;
  } catch (error) {
    throw new Error('Failed to fetch URL');
  }
}

module.exports = wordpressDetector;
