const Album = require('./../models/albumModel');
const Song = require('./../models/songModel');

exports.getAllAlbums = async (req, res) => {
  const albums = await Album.find().populate({
    path: 'album_songs album_artists',
    select:
      'title songImg publishYear lyrcs duration artistname totalListener artist_img',
    populate: {
      path: 'artist album',
      select: 'artistname artist_img album_title albumImg',
    },
  });

  res.status(200).json({
    status: 'All Albums',
    albumTotal: albums.length,
    albums,
  });
};

exports.getAlbum = async (req, res) => {
  const id = req.params.albumId;

  const album = await Album.findById(id).populate({
    path: 'album_songs album_artists ',
    select:
      'title songImg publishYear duration lyrcs artistname totalListener  ',
    populate: {
      path: 'artist album',
      select: 'artistname artist_img album_title albumImg',
    },
  });

  if (!album) {
    res.status(400).json({
      message: 'album coulnt found!',
    });
  }

  res.status(200).json({
    status: 'Album',
    songSize: album.album_songs.length,
    album,
  });
};

exports.createAlbum = async (req, res) => {
  const { album_title, album_artists, publishYear, album_long, album_songs } =
    req.body;

  const newAlbum = new Album({
    album_title,
    album_artists,
    publishYear,
    album_long,
    album_songs,
  });

  await newAlbum.save();

  res.status(204).json({
    status: 'Album Has Been Created',
    newAlbum,
  });
};

exports.updateAlbum = async (req, res) => {
  const documentId = req.params.albumId;
  try {
    const updatedFields = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      documentId,
      {
        $set: updatedFields,
      },
      { new: true },
    );

    if (!updatedAlbum) {
      return res.status(400).json({ message: 'Song not found' });
    }
    res.status(200).json({ updatedAlbum });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating document' });
  }
};
