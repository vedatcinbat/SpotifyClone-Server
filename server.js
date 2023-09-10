import { connect } from 'mongoose';
import cors from 'cors';
import User from './models/userModel';
import Artist from './models/artistModel';
import Song from './models/songModel';
import Album from './models/albumModel';
import PlayList from './models/playlistModel';

import { config } from 'dotenv';

config({ path: './config.env' });

import { listen } from './app';

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    const conn = await connect(DB);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

connectDB.then(() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening port ${port}`);
  });
});
