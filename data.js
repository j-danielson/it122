const albums = [
    {
        title: 'Dreamland',
        artist: 'Glass Animals',
        genre: 'Indie',
        release: 'August 7th, 2020'
    },
    {
        title: 'Icky Thump',
        artist: 'The White Stripes',
        genre: 'Blues Rock',
        release: 'June 15th, 2007'
    },
    {
        title: 'Flower Boy',
        artist: 'Tyler, The Creator',
        genre: 'Hip Hop',
        release: 'July 21, 2017'
    },
    {
        title: 'Plastic Beach',
        artist: 'Gorillaz',
        genre: 'Electronic',
        release: 'March 3rd, 2010'
    },
    {
        title: 'Voices',
        artist: 'Phantogram',
        genre: 'Electronica',
        release: 'February 18th, 2014'
    }
]

export function getAll() {
    return albums;
}

export function getItem(key, value) {
    for (let i = 0; i < albums.length; i++) {
        if (albums[i][key] === value) {
            return albums[i];
        }
    }
    return null;
}

// module.export = {
//     getAll,
//     getItem
// }