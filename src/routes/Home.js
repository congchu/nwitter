import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttactment] = useState();

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
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

  const onFileCahnge = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttactment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachmentClick = () => {
    setAttactment(null);
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
        <input type="file" accept="image/*" onChange={onFileCahnge} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <>
            <img src={attachment} width="50" height="50" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </>
        )}
      </form>
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
