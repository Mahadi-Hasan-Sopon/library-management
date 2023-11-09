import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../configs/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      if (currentUser) {
        // console.log(currentUser.role, "role in context");
        const uid = { uid: currentUser.uid };
        fetch(`https://encyclopaedia-server.vercel.app/isAdmin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(uid),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.role) {
              setUserRole(data.role);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const userDetails = { email: currentUser.email };

        fetch("https://encyclopaedia-server.vercel.app/jwt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unSubscribe();
  }, []);

  const createUserWithEmail = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserInfo = (displayName, role) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      role: role ? role : "user",
    });
  };

  const loginUserWithEmail = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignInWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const LogOutUser = async () => {
    setIsLoading(true);
    return signOut(auth).then(() => {
      fetch("https://encyclopaedia-server.vercel.app/logOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    });
  };

  const authInfo = {
    user,
    isLoading,
    createUserWithEmail,
    loginUserWithEmail,
    SignInWithGoogle,
    LogOutUser,
    updateUserInfo,
    userRole,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
