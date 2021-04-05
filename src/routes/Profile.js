import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  useEffect(() => {
    getMyNweets();
  }, []);

  const onLogOutClick = () => authService.signOut();

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onChangeDisplayName = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmitDisplayName = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmitDisplayName}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChangeDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
