import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuid4 } from "uuid";

const NweetFactor = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttactment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuid4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObject = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObject);
    setNweet("");
    setAttactment("");
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
  );
};

export default NweetFactor;
