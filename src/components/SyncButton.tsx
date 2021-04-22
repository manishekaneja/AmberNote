import React, { useContext } from "react";
import { LoginPopupContext } from "../context/LoginPopupContext";
import { UserContext } from "../context/UserContext";
import { useFirebaseAuthHook } from "../hooks/useFirebaseAuthHooks";
import LogoutIcon from "../icons/Logout";
import SyncIcon from "../icons/SyncIcon";
function SyncButton() {
  const { setLoginPopupFlag } = useContext(LoginPopupContext);
  const { isLoggedIn } = useContext(UserContext);
const { signOut } = useFirebaseAuthHook();
  if (!isLoggedIn) {
    return (
      <button
        className="px-2 py-2 focus:outline-none"
        onClick={() => {
          setLoginPopupFlag(true);
        }}
      >
        <SyncIcon />
      </button>
    );
  } else {
    return (
      <button
        className="px-2 py-2 focus:outline-none"
        onClick={() => {
            signOut();
        }}
      >
        <LogoutIcon />
      </button>
    );
  }
}

export default SyncButton;
