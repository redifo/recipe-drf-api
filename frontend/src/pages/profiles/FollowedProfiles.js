import { axiosReq } from "../../api/axiosDefaults";
import { useEffect, useState } from 'react';
import { fetchMoreData } from '../../utils/utils';
import { Container, Button } from 'react-bootstrap';
import Profile from './Profile'


function FollowedProfiles() {
    const [profilesData, setProfilesData] = useState({ results: [], next: null });

    useEffect(() => {
        const fetchFollowedProfiles = async () => {
            try {
                const response = await axiosReq.get('/profiles/followed/');
                setProfilesData(response.data);
            } catch (error) {
                console.error('Failed to fetch followed profiles', error);
            }
        };

        fetchFollowedProfiles();
    }, []);

    const handleLoadMore = () => {
        if (profilesData.next) {
            fetchMoreData(profilesData.next, setProfilesData);
        }
    };

    return (
        <Container>
            {profilesData.results.length > 0 ? (
                profilesData.results.map(profile => (
                    <Profile key={profile.id} profile={profile} imageSize={75} mobile={false} />
                ))
            ) : (
                <p>No followed profiles found.</p>
            )}
            {profilesData.next && (
                <Button onClick={handleLoadMore} className="my-3">Load More</Button>
            )}
        </Container>
    );
}

export default FollowedProfiles;
