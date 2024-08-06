import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify";
import { catchErrors } from "./utils";
import { GlobalStyle } from "./styles";
import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    console.log("Access Token:", accessToken);
    setToken(accessToken);

    const fetchData = async () => {
      try {
        console.log("Fetching user profile...");
        const { data } = await getCurrentUserProfile();
        console.log("User profile data:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error.response || error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
    setProfile(null);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={handleLogout}>
              Log Out
            </StyledLogoutButton>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-tracks" element={<TopTracks />} />
              <Route path="/playlists/:id" element={<Playlist />} />
              <Route path="/playlists/" element={<Playlists />} />
            </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
