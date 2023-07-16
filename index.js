import express from 'express';
import { request } from 'http';
import { Album } from "./models/albums.js";

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    Album.find({}).lean()
      .then((albums) => {
        // respond to browser only after db query completes
        res.render('home', { albums });
      })
      .catch(err => next(err));
});



app.get('/albums/:title', (req,res,next) => {
    // db query can use request parameters
    Album.findOne({ title:req.params.title }).lean()
        .then((album) => {
            res.render('album', {result: album} );
        })
        .catch(err => next(err));
});

// app.get('/albums/:title', (req, res) => {
//     const album = getItem('title', req.params.title);
//     if (album) {
//         res.render('album', {album});
//     } 
// });

app.use((req,res) => {
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });