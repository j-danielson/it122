import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

const albums = getAll();

app.get('/', (req, res) => {
    res.render('home', {albums});
});

app.get('/albums/:title', (req, res) => {
    const album = getItem('title', req.params.title);
    if (album) {
        res.render('album', {album});
    } 
});

app.use((req,res) => {
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });