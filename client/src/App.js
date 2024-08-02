import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify";
import { catchErrors } from "./utils";
import styled from "styled-components/macro";
import { GlobalStyle } from "./styles";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   ScrollRestoration,
// } from "react-router-dom";

const StyledLoginButton = styled.a`
  background-color: green;
  color: white;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

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
        {/* {!token ? (
          
        ) : null} */}
        <StyledLoginButton
          className="App-link"
          href="http://localhost:8888/login"
        >
          Log in to Spotify
        </StyledLoginButton>

        {/* <Router>
            <ScrollRestoration />

            <Routes>
              <Route path="/top-artists" element={<h1>Top Artists</h1>} />
              <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
              <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
              <Route path="/playlists" element={<h1>Playlists</h1>} />
              <Route
                path="/"
                element={
                  <>
                    <button onClick={logout}>Log Out</button>

                    {profile && (
                      <div>
                        <h1>{profile.display_name}</h1>
                        <p>{profile.followers.total} Followers</p>
                        {profile.images.length && profile.images[0].url && (
                          <img src={profile.images[0].url} alt="Avatar" />
                        )}
                      </div>
                    )}
                  </>
                }
              />
            </Routes>
          </Router> */}
      </header>
    </div>
  );
}

export default App;
