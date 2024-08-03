import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, PlaylistsGrid, Loader } from "../components";

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylistsData(data);
      setPlaylists(data.items);
      setNextUrl(data.next);
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!nextUrl) {
      return;
    }

    const fetchMoreData = async () => {
      const { data } = await axios.get(nextUrl);
      setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.items]);
      setNextUrl(data.next);
    };

    catchErrors(fetchMoreData());
  }, [nextUrl]);

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists ? <PlaylistsGrid playlists={playlists} /> : <Loader />}
      </SectionWrapper>
    </main>
  );
};

export default Playlists;
