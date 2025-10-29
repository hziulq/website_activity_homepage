import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const sql_api = process.env.SQL_API;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        res.redirect("/top");
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.get('/top', async (req, res) => {
    try {
        res.render("top.ejs", { activity: process.env.ACTIVITY });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.get('/about', async (req, res) => {
    try {
        res.render("about.ejs", { activity: process.env.ACTIVITY });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.get('/contact', async (req, res) => {
    try {
        res.render("contact.ejs",{ activity: process.env.ACTIVITY });
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

app.use(async (req, res) => {
    try {
        res.render("contact.ejs",{ activity: process.env.ACTIVITY });
    }
    catch (err) {
        res.status(500).send('Server Error');
        console.log(err.message);
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`======== now server running on port ${port} =========`);
    }
});