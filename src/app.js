// express モジュールのインスタンス作成
const { response } = require('express');
const express = require('express');
const app = express();
// パス指定用モジュール
const path = require('path');

app.listen(3000, () => {
  console.log('Running at Port 3000...');
});

app.get('/', (req, res) => {
  res.contentType('application/json');
  const query = req.query;
  const pattern = query.pattern;
  const callbackName = query.callback;
  // 送信された情報によって返却される情報を変更
  let obj = {};
  if (pattern == 'a') {
    obj = {
      author: 'bun_patterna',
      message: 'パターンAです',
      list: [
        '実際は',
        'パラメーターでDBから取得する値を',
        '変えるイメージです。',
      ],
    };
  } else {
    obj = {
      author: 'bun_patternb',
      message: 'パターンBです',
      list: ['パラメーターを動的に', '変更する'],
    };
  }
  //　今回は実装を勉強するために以下のようにしていますが、res.jsonp(obj)で大丈夫です
  json = JSON.stringify(obj);
  res.send(`${callbackName}(${json})`);
  //こんな感じのjsコードとして返されます
  // callback({author: ・・・}) というjsコードを返却
});

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
