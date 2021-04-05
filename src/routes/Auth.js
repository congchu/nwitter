import React from "react";
import { authService, firebaseInstace } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    console.log(name);

    let provider;
    if (name === "google") {
      provider = new firebaseInstace.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <div>
        <AuthForm />
        <button name="google" onClick={onSocialClick}>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
