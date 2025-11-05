import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT;

const pool = new Pool({
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

app.get('/news', async (req, res) => {
    try {
        
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.get("/update")

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
