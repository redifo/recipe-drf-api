import { axiosReq } from "../../api/axiosDefaults";
import { useEffect, useState } from 'react';

function FollowedProfiles() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchFollowedProfiles = async () => {
            try {
                const response = await axiosReq.get('/profiles/followed/');
                setProfiles(response.data.results);
            } catch (error) {
                console.error('Failed to fetch followed profiles', error);
            }
        };

        fetchFollowedProfiles();
    }, []);
    return (
        <div>
            
            {profiles.map(profile => (
                <div key={profile.id}>
                    <h3>{profile.user}</h3>
                    {/* ls */}
                </div>
            ))}
        </div>
    );
}

export default FollowedProfiles;
