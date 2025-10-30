import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/news', async (req, res) => {
    try {
        
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
