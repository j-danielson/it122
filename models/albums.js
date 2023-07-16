import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://superman:itLoM123@project0.kxznvk6.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    dbName: 'it-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const albumSchema = new Schema({
 title: { type: String, required: true },
 artist: String,
 genre: String,
 release: String,
});

export const Album = mongoose.model('Album', albumSchema);