import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";
import { useEffect } from "react";
import { persnoaldetails, pgform } from "Apis/Persnoldetailsform";
import { app } from "../Firebase/firebase";
import { useState } from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

export default function App() {
  const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
  };
  
  const check = async () => {
    // await app
    //   .auth()
    //   .signInWithCustomToken(token)
    //   .then((userCredential) => {
    //     console.log("userCredential", userCredential);
    //   });
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  const content = useRoutes(routes);
  // useEffect(() => {
  //   check();
  //   const getItems = async () => {
  //     try {
  //       const params = new URLSearchParams(window.location.search);
  //       const userID = params.get("id");
  //       console.log("userID", userID);
  //       localStorage.setItem("userID", userID);
  //       const resp = await pgform();
  //       if (resp.status === 200) {
  //         const data = await resp.json();
  //         console.log("getstudentuserdata", data?.message);
  //         const users = Array.isArray(data?.message) ? data?.message : [];
  //         const foundUser = users.find((item) => item?.userID === userID);
  //         // console.log("foundUser", foundUser);
  //         if (foundUser) {
  //           // User found, handle accordingly
  //         } else {
  //           const details = await persnoaldetails({
  //             userID: userID
  //           });
  //           console.log("resp", details);
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getItems();
  // }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
      </SettingsProvider>
    </AlertProvider>
  );
}
