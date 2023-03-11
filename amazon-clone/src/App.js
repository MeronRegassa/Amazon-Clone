// import './App.css';

import React, { useEffect } from "react";
import MyRouters from "./Components/MyRouters";
import { useStateValue } from "./Components/StateProvider";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        //the user just logged in

        dispatch({
          type: "SET_USER",
          user: currentUser,
        });
      } else {
        //the user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <MyRouters />
    </div>
  );
}

export default App;
