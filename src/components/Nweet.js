import { dbService } from "fbase";
import React from "react";
const Nweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete thie nweet?");
    if (ok) {
      dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && <button onClick={onDeleteClick}>Delete Nweet</button>}
      {isOwner && <button>Edit Nweet</button>}
    </div>
  );
};

export default Nweet;
