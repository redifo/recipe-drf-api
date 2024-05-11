import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { fetchMoreData } from '../../utils/utils';
import Profile from './Profile';
import { useProfileData } from "../../contexts/ProfileDataContext";


function FollowedProfiles() {
  const { followedProfiles, setProfileData } = useProfileData();

  const handleLoadMore = () => {
    if (followedProfiles.next) {
      fetchMoreData(followedProfiles.next, newData => {
        setProfileData(prev => ({
          ...prev,
          followedProfiles: {
            ...prev.followedProfiles,
            results: [...prev.followedProfiles.results, ...newData.results],
            next: newData.next
          }
        }));
      });
    }
  };

  return (
    <Container className="mt-5">
      {followedProfiles.results.length > 0 ? (
        followedProfiles.results.map(profile => (
          <Profile key={profile.id} profile={profile} imageSize={75} mobile={false} card={true} />
        ))
      ) : (
        <p>You are not following anyone at the moment.</p>
      )}
      {followedProfiles.next && (
        <Button onClick={handleLoadMore} className="my-3">Load More</Button>
      )}
    </Container>
  );
}

export default FollowedProfiles;
