import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify";
import { catchErrors } from "./utils";
import { GlobalStyle } from "./styles";
import { Login, Profile } from "./pages";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   ScrollRestoration,
// } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();

      console.log(profile); // delete this later
      console.log(token); // delete this later

      setProfile(data);
    };

    catchErrors(fetchData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : // <Router>
        //   <ScrollRestoration />

        //   <Routes>
        //     <Route path="/">
        //       <Profile />
        //     </Route>
        //   </Routes>
        // </Router>
        // )}
        null}
      </header>
    </div>
  );
}

export default App;
