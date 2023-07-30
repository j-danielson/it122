import express from 'express';
import { request } from 'http';
import { Album } from "./models/albums.js";
import cors from 'cors';



const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json()); //Used to parse JSON bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.get('/', (req, res, next) => {
    Album.find({}).lean()
      .then((albums) => {
        // respond to browser only after db query completes
        res.render('home', { albums });
      })
      .catch(err => next(err));
});

app.get('/api/albums', (req,res) => {
  Album.find({}).lean()
    .then((albums) => {
      res.json(albums);
    })
    .catch(err =>  {
      res.status(500).send('Database Error occurred');
    })
});

app.get('/api/albums/:title', (req,res) => {
  Album.findOne({ title:req.params.title }).lean()
      .then((book) => {
         res.json(book);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});

app.post('/api/albums', (req, res) => {
  const { title, artist, genre, release } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and artist are required' });
  }

  const newAlbum = new Album({ title, artist, genre, release });

  newAlbum
    .save()
    .then((createdAlbum) => {
      res.status(201).json({ message: 'Album created', album: createdAlbum });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error occurred' });
    });
});

app.put('/api/albums/:title', (req, res) => {
  const title = req.params.title;
  const { artist, genre, release } = req.body;

  if (!artist) {
    return res.status(400).json({ error: 'Artist field is required' });
  }

  const updatedFields = {};
  if (artist) updatedFields.artist = artist;
  if (genre) updatedFields.genre = genre;
  if (release) updatedFields.release = release;

  Album.findOneAndUpdate({ title }, updatedFields, { new: true })
    .then((updatedAlbum) => {
      if (!updatedAlbum) {
        return res.status(404).json({ error: 'Album not found' });
      }
      res.json({ message: 'Album updated', updatedAlbum });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error occurred' });
    });
});

app.delete('/api/albums/:title', (req, res) => {
  const title = req.params.title;

  Album.findOneAndDelete({ title })
    .then((deletedAlbum) => {
      if (!deletedAlbum) {
        return res.status(404).json({ error: 'Album not found' });
      }
      res.json({ message: 'Album deleted', deletedAlbum });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error occurred' });
    });
});

app.get('/albums/:title', (req,res,next) => {
    // db query can use request parameters
    Album.findOne({ title:req.params.title }).lean()
        .then((album) => {
            res.render('album', {result: album} );
        })
        .catch(err => next(err));
});

app.use((req,res) => {
    res.status(404);
    res.send('404 - Not found');
});
app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });