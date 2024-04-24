const axios = require('axios');
const cheerio = require('cheerio');

async function wordpressDetector(url) {
  console.log('run function wordpressDetector!')
  try {
    const htmlResponse = await axios.get(url);
    const html = htmlResponse.data;
    const $ = cheerio.load(html);

   // var title = $('meta[name="generator"]').attr('content')
    const generatorMetaTag = $('meta[name="generator"]');
   // console.log('meta2', title);

    // Проверяем наличие мета тега generator, характерного для WordPress
    if (generatorMetaTag.length > 0) {
      const content = generatorMetaTag.attr('content');
      console.log('meta3', content);
      console.log('WordPress detected from meta generator tag');
      return true;
      // if (content && content.toLowerCase().includes('Wordpress')) {
      // }
    }

    // Проверяем наличие определенных классов HTML, характерных для WordPress
    const hasWPContent = $('script[src*=wp-content]');
    const hasWPBlock = $('script[src*=wp-block]');

    if (hasWPContent.length > 0) {
      console.log('WordPress content detected (wp-content)');
     // console.log(hasWPContent);
      return true;
    }
    if (hasWPBlock.length > 0) {
      console.log('WordPress block detected (wp-block)');
     // console.log(hasWPContent);
      return true;
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


