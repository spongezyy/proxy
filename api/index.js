import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  let url = req.query.url;
  if (!url) {
    return res.status(400).send('URLパラメータが必要です');
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const response = await fetch(url);
    const body = await response.text();
    res.send(body);
  } catch (e) {
    res.status(500).send('アクセス先に接続できませんでした');
  }
});

export default app;

