const express = require('express');
const cors = require('cors');
const wordpressDetector = require('./wordpressDetector'); // Функция для определения, используется ли WordPress

const app = express();
app.use(express.json());
app.use(cors());

app.post('/check-wordpress', async (req, res) => {
  const { url } = req.body;
  try {
    const isWordPress = await wordpressDetector(url);
    res.json({ isWordPress });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
