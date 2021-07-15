const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  playlists: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
