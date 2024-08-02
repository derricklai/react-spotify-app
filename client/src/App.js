import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify";
import { catchErrors } from "./utils";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();

      console.log(profile); // delete this later

      setProfile(data);
    };

    catchErrors(fetchData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <Router>
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
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
