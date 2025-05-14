"use client";

import { gapi } from "gapi-script";

export const signInWithGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();
  const user = await auth.signIn();
  console.log("로그인한 사용자:", user.getBasicProfile().getName());
};
