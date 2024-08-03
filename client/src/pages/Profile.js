import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile } from "../spotify";
import { StyledHeader } from "../styles";
import styled from "styled-components/macro";

const ProfileImg = styled.img`
  width: 225px;
  height: 225px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%; /* Optional: Makes the image circular */
  margin-right: 20px; /* Adds space between the image and the text */
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[1].url && (
                <ProfileImg src={profile.images[0].url} alt="Avatar" />
                // <img
                //   className="header__img"
                //   src={profile.images[1].url}
                //   alt="Avatar"
                //   height="150"
                // />
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  <span>
                    {profile.followers.total} Follower
                    {profile.followers.total !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
        </>
      )}
    </>
  );
};

export default Profile;
