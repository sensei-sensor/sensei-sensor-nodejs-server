// https://qiita.com/tamura_CD/items/98bbd4a3143da960faf5 このサンプル

const createError = require('http-errors');       // requireで使用するNode.jsパッケージをインスタンス化
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const sensors = require('./routes/sensors');      // requireで、使用するミドルウェアをセット。
const website = require('./routes/website');

const app = express();                            // Expressのサーバ生成処理を app にセット。

// view engine setup                              // HTMLテンプレートエンジンのセット。
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));                           // 先頭で定義したNode.jsパッケージのインスタンスを使って、各種処理を設定。
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/sensors', sensors);
app.use('/website', website);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler         // ルーティングで該当先が無かったら、404画面を表示するミドルウェア。
app.use((req, res, next) => {
	next(createError(404));
});

// error handler                                  // エラーが発生したら、500画面を表示するミドルウェア。
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
