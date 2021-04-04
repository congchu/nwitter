import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("nweets")
      .add({ text: nweet, createAt: Date.now(), creatorId: userObj.uid });
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="nweet"
          type="text"
          onChange={onChange}
          placeholder="What's on Your mind?"
          maxLength={120}
          value={nweet}
        />
        <div>
          {nweets.map((nweet) => (
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          ))}
        </div>
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
