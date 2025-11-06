import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const options = {
    key: process.env.PRIVATE_KEY,
    cert: process.env.CERTIFICATE
};

const app = express(options);

const port = process.env.PORT;

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20, // プールの最大接続数
    idleTimeoutMillis: 30000, // 接続がアイドル状態で破棄されるまでの時間
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/news/:id', async (req, res) => {

    const id = req.params.id;
    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT n.id, n.title, n.post_date, n.content, g.genre_name
            FROM news AS n
            INNER JOIN news_genres AS g
              ON n.genre_id = g.id
            WHERE n.id = $1
            ORDER BY n.post_date DESC;  
            `,
            [id]
        )

        res.status(200).json({
            status: 'success',
            datas: result.rows,
            count: result.rowCount
        });
        console.log("success! /news")

    } catch (error) {
        console.error('--- プール操作エラー ---', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve data from database.',
            details: err.message
        });
    } finally {
        // 処理が終わったらクライアントをプールに「解放」する (重要)
        client.release();
        // console.log('Client released back to pool.');
    }
})

app.get('/news', async (req, res) => {

    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT n.id, n.title, n.post_date, g.genre_name
            FROM news AS n
            INNER JOIN news_genres AS g
              ON n.genre_id = g.id
            ORDER BY n.post_date DESC;  
            `
        )

        res.status(200).json({
            status: 'success',
            datas: result.rows,
            count: result.rowCount
        });
        console.log("success! /news")

    } catch (error) {
        console.error('--- プール操作エラー ---', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve data from database.',
            details: err.message
        });
    } finally {
        // 処理が終わったらクライアントをプールに「解放」する (重要)
        client.release();
        // console.log('Client released back to pool.');
    }
})

// id SERIAL PRIMARY KEY,
// post_date DATE DEFAULT CURRENT_TIMESTAMP,
// genre_id INTEGER,
// title VARCHAR(256),
// thumbnail_url VARCHAR(1024),
// content TEXT

app.get("/update")

app.listen(port, () => {
    console.log(`======== now server running on port ${port} =========`);

    // test();

})

async function test() {

}