import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const sql_api = process.env.SQL_API;
const options = {
    key: process.env.PRIVATE_KEY,
    cert: process.env.CERTIFICATE
}

const app = express(options);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


/**
 * ルートにアクセスしたときに、トップページリダイレクトするハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/', async (req, res) => {
    try {
        res.redirect("/top");
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

/**
 * トップページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/top', async (req, res) => {
    try {
        res.render("top.ejs", {
            activity: process.env.ACTIVITY,
            currentPage: 'top'
         });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})


/**
 * 概要ハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/about', async (req, res) => {
    try {
        res.render("about.ejs", { 
            activity: process.env.ACTIVITY ,
            currentPage: 'about',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})


/**
 * 個別のニュースページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/news/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await axios.get(`${sql_api}/news/${id}`);
        // console.log(result.data)

        res.render("news-id.ejs",{
            activity: process.env.ACTIVITY,
            article: result.data.datas[0],
            currentPage: 'news',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})


/**
 * ニュースページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/news', async (req, res) => {
    try {
        const result = await axios.get(`${sql_api}/news`);
        // console.log(result.data)

        res.render("news.ejs",{
            activity: process.env.ACTIVITY,
            datas: result.data.datas,
            currentPage: 'news',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})


/**
 * 部員ページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/members', async (req, res) => {
    try {
        res.render("members.ejs",{ 
            activity: process.env.ACTIVITY,
            currentPage: 'members',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})


/**
 * 入部ページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/join', async (req, res) => {
    try {
        res.render("join.ejs",{ 
            activity: process.env.ACTIVITY,
            currentPage: 'join',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

/**
 * お問い合わせページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.get('/contact', async (req, res) => {
    try {
        res.render("contact.ejs",{ 
            activity: process.env.ACTIVITY,
            currentPage: 'contact',
        });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})





// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const response = await axios.post(`${sql_api}/login`, { username, password });
//     }
//     catch (err) {
//         res.status(500).send('Login Failed');
//         console.log(err.message);
//     }
// });

/**
 * 404ページハンドラ。
 * @param {object} req - Expressのリクエストオブジェクト。
 * @param {object} res - Expressのレスポンスオブジェクト。
 * @returns {void} レスポンスをクライアントに送信する。
 */
app.use(async (req, res) => {
    try {
        res.render("error_404.ejs",{ activity: process.env.ACTIVITY });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

/**
 * トップページハンドラ。
 * @param {object} port - ポート番号。
 */
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`======== now server running on port ${port} =========`);
    }
});