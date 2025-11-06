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
    console.log("/news/:id called")

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
        console.log("success! /news/:id")

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
    console.log("/news called")

    let limit;
    let offset;

    console.log(req.query.top)

    if (req.query.top) {
        offset = 0;
        limit = 4;
    } else {
        offset = req.query.page * 20;
        limit = 20;
    }

    console.log(offset)

    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT n.id, n.title, n.post_date, g.genre_name
            FROM news AS n
            INNER JOIN news_genres AS g
              ON n.genre_id = g.id
            ORDER BY n.post_date DESC
            LIMIT $1
            OFFSET $2;
            `,
            [limit, offset]
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

app.get('/updates/:id', async (req, res) => {
    console.log("/updates/:id called")

    const id = req.params.id;
    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT u.id, u.title, u.post_date, u.content, g.genre_name
            FROM updates AS u
            INNER JOIN update_genres AS g
              ON u.genre_id = g.id
            WHERE u.id = $1
            ORDER BY u.post_date DESC;  
            `,
            [id]
        )

        res.status(200).json({
            status: 'success',
            datas: result.rows,
            count: result.rowCount
        });
        console.log("success! /updates/:id")

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

app.get('/updates', async (req, res) => {
    console.log("/updates called")

    let limit;
    let offset;

    console.log(req.query.top)

    if (req.query.top) {
        offset = 0;
        limit = 4;
    } else {
        offset = req.query.page * 20;
        limit = 20;
    }

    console.log(offset)

    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT u.id, u.title, u.post_date, g.genre_name
            FROM updates AS u
            INNER JOIN update_genres AS g
              ON u.genre_id = g.id
            ORDER BY u.post_date DESC
            LIMIT $1
            OFFSET $2;
            `,
            [limit, offset]
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

app.get('/members', async (req, res) => {
    console.log("/members called")

    console.log(req.query.select)

    let select;

    if (req.query.select) {
        select = req.query.select
    } else {
        select = 'all';
    }

    console.log(select)

    const client = await pool.connect();

    try {

        let result;
        if (select == 'all') {
            result = await client.query(
                `
            SELECT * 
            FROM members AS m
            INNER JOIN grades AS g
              ON m.grade_id = g.id
            INNER JOIN cources AS c
              ON m.cource_id = c.id
            `
            )
        }
        else {
            result = await client.query(
                `
            SELECT * 
            FROM members AS m
            INNER JOIN grades AS g
              ON m.grade_id = g.id
            INNER JOIN cources AS c
              ON m.cource_id = c.id
            WHERE m.grade_id = $1;
            `,
                [select]
            )
        }


        res.status(200).json({
            status: 'success',
            datas: result.rows,
            count: result.rowCount
        });
        console.log("success! /members")

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

app.listen(port, () => {
    console.log(`======== now server running on port ${port} =========`);

    // test();

})

async function test() {

}