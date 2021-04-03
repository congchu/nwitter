import { dbService } from "fbase";
import React, { useState } from "react";
export default () => {
  const [nweet, setNweet] = useState("");

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
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
