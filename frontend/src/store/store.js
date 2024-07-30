/** @format */

import { createStore } from "easy-peasy";
// import favoriteModel from "./favoriteModel";
// import noteModel from "./noteModel";
// import playlistModel from "./playlistModel";
// import recentPlaylistModel from "./recentPlaylistModel";

const store = createStore({
  //   playlists: persist(playlistModel, { storage: localStorage }),
  //   recent: persist(recentPlaylistModel, { storage: localStorage }),
  //   favorite: persist(favoriteModel, { storage: localStorage }),
  //   notes: persist(noteModel, { storage: localStorage }),
});

export default store;
