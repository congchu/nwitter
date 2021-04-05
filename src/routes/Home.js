import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Nweet from "components/Nweet";
import NweetFactor from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactor userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
