const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const verify = require("./verifyToken");

//Get user's wishlist
router.get("/", verify, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ user_id: req.user._id });
    res.status(200).json(playlist);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's wishlist or update previous wishlist
router.post("/", verify, async (req, res) => {
  const hasPlaylist = await Playlist.find({ user_id: req.user._id});
  if(hasPlaylist.length !== 0){
    try {
      const savedPlaylist = await Playlist.findOneAndUpdate(
        { user_id: req.user._id },
        { playlists: req.body.playlists },
        {},
        async function (err, result) {
          if(err){
            console.log(err)
          }
        }
      );
      res.status(200).json(savedPlaylist);
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err });
    }
  }
 
});


module.exports = router;
