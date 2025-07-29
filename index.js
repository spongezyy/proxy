import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  let url = req.query.url;
  if (!url) {
    return res.send(`
      <h1>シンプルプロキシ</h1>
      <form method="GET" action="/">
        <input type="text" name="url" placeholder="アクセスしたいURLを入力" style="width:80%;" />
        <button type="submit">アクセス</button>
      </form>
    `);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`プロキシサーバーがポート${PORT}で起動しました`);
});
