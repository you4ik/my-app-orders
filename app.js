const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Отображение списка заказов
app.get('/', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { orders: rows });
    });
});

// Добавление нового заказа
app.post('/add', (req, res) => {
    const { name, amount } = req.body;
    if (name && amount) {
        db.run('INSERT INTO orders (name, amount) VALUES (?, ?)', [name, amount], (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// Удаление заказа по ID
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM orders WHERE id = ?', id, (err) => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

// Редактирование заказа
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, amount } = req.body;
    db.run('UPDATE orders SET name = ?, amount = ? WHERE id = ?', [name, amount, id], (err) => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
