const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel');
const Artist = require('./models/artistModel');
const Song = require('./models/songModel');
const Album = require('./models/albumModel');
const PlayList = require('./models/playlistModel');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

