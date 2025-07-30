import fetch from 'node-fetch';

export default async function handler(req, res) {
  let url = req.query.url;
  if (!url) {
    return res.status(400).send('urlパラメータが必要です');
  }

  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const response = await fetch(url);
    const body = await response.text();
    res.status(200).send(body);
  } catch (e) {
    console.error('Fetch error:', e.message);
    res.status(500).send('アクセス先に接続できませんでした');
  }
}

