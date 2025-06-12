import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes for API testing interface
app.get('/', (req, res) => {
    res.render('account');
});

app.get('/account', (req, res) => {
    res.render('account');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.get('/category', (req, res) => {
    res.render('category');
});

app.get('/order', (req, res) => {
    res.render('order');
});

app.get('/shop', (req, res) => {
    res.render('shop');
});

app.get('/customer', (req, res) => {
    res.render('customer');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 