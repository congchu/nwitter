import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
export default () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObejct = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObejct, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({ nweet, createAt: Date.now() });
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
              <h4>{nweet.nweet}</h4>
            </div>
          ))}
        </div>
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
