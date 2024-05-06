import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row, Container, Button, Image } from "react-bootstrap";

import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import RecipeCard from "../recipes/RecipeCard";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/img/no-results.png";

import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropDown";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileRecipes, setProfileRecipes] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();



    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.user;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axiosReq.get(`/profiles/${id}/`);
                const recipesResponse = await axiosReq.get(`/recipes/?user=${id}`);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [profileResponse.data] },
                }));
                setProfileRecipes(recipesResponse.data);
                setHasLoaded(true);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const handleLoadMore = () => {
        if (profileRecipes.next) {
            fetchMoreData(profileRecipes.next, setProfileRecipes);
        }
    };

    const profileDetails = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.image} />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.user}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.recipes_count}</div>
                            <div>recipes</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser && !is_owner && (profile?.following_id ? (
                        <Button className={`${btnStyles.Button} ${btnStyles.BlackOutline}`} onClick={() => handleUnfollow(profile)}>
                            unfollow
                        </Button>
                    ) : (
                        <Button className={`${btnStyles.Button} ${btnStyles.Black}`} onClick={() => handleFollow(profile)}>
                            follow
                        </Button>
                    ))}
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );

    const recipeList = (
        <>
            <hr />
            <p className="text-center">{profile?.user}'s recipes</p>
            <hr />
            <Row>
                {profileRecipes.results.length ? (
                    profileRecipes.results.map((recipe) => (
                        <Col sm={12} md={6} lg={4} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Col>
                    ))
                ) : (
                    <Asset src={NoResults} message={`No results found, ${profile?.user} hasn't posted any recipes yet.`} />
                )}
            </Row>
            {profileRecipes.next && (
                <Button className="my-3" onClick={handleLoadMore}>Load More Recipes</Button>
            )}
        </>
    );
    console.log(profileRecipes.results);

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {profileDetails}
                            {recipeList}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;
