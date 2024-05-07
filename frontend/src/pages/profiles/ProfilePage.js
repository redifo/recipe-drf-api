import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Image } from "react-bootstrap";

import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import RecipeCard from "../recipes/RecipeCard";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";

import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/img/no-results.png";

import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropDown";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileRecipes, setProfileRecipes] = useState({ results: [] });
    const [profileFavorites, setProfileFavorites] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [displayedFavoritesCount, setDisplayedFavoritesCount] = useState(4);
    const [displayedRecipesCount, setDisplayedRecipesCount] = useState(4);

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.user;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axiosReq.get(`/profiles/${id}/`);
                const recipesResponse = await axiosReq.get(`/recipes/?user=${id}`);
                const profileFavoritesResponse = await axiosReq.get(`/recipes/?favorited_by=${id}`);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [profileResponse.data] },
                }));
                setProfileFavorites(profileFavoritesResponse.data);
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
            fetchMoreData(profileRecipes.next).then(newData => {
                setProfileRecipes(prev => ({
                    ...prev,
                    results: [...prev.results, ...newData.results],
                    next: newData.next,
                }));
            });
        } else if (profileRecipes.results.length > displayedRecipesCount) {
            setDisplayedRecipesCount(prevCount => prevCount + 4);
        }
    };

    const handleLoadMoreFavorites = () => {
        if (profileFavorites.next) {
            fetchMoreData(profileFavorites.next).then(newData => {
                setProfileFavorites(prev => ({
                    ...prev,
                    results: [...prev.results, ...newData.results],
                    next: newData.next,
                }));
            });
        } else if (profileFavorites.results.length > displayedFavoritesCount) {
            setDisplayedFavoritesCount(prevCount => prevCount + 4);
        }
    };

    const profileDetails = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.image} />


                </Col>
                <Col lg={7}>
                    <h3 className={styles.Username}>{profile?.user}</h3>
                    <h5 className="mb-2">{profile?.bio}</h5>

                </Col>



                <Col lg={2} className="text-lg-right">
                    <span className={styles.ProfileEditDropdown}>{profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}</span>
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
            <Row className="justify-content-center no-gutters">
                <Col xs={3} className="my-2 text-center">
                    <div>{profile?.recipes_count}</div>
                    <div>recipes</div>
                </Col>
                <Col xs={3} className="my-2 text-center">
                    <div>{profile?.followers_count}</div>
                    <div>followers</div>
                </Col>
                <Col xs={3} className="my-2 text-center">
                    <div>{profile?.following_count}</div>
                    <div>following</div>
                </Col>
            </Row>
        </>
    );
    const favoritedList = (
        <>
            <hr />
            <h2 className="">{profile?.user}'s Favorite Recipes</h2>

            <Row>
                {profileFavorites.results.length ? (
                    profileFavorites.results.slice(0, displayedFavoritesCount).map(recipe => (
                        <Col sm={6} md={4} lg={3} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Col>
                    ))
                ) : (
                    <Asset src={NoResults} message={`No results found, ${profile?.user} hasn't favorited any recipes yet.`} />
                )}
            </Row>
            <Row className="text-center">
                {profileFavorites.results.length > displayedFavoritesCount && (
                    <Button className="my-3" onClick={handleLoadMoreFavorites}>Load More Recipes</Button>
                )}
            </Row>
        </>
    );

    const recipeList = (
        <>
            <hr />
            <h2 className="">{profile?.user}'s recipes</h2>

            <Row>
                {profileRecipes.results.length ? (
                    profileRecipes.results.slice(0, displayedRecipesCount).map(recipe => (
                        <Col sm={6} md={4} lg={3} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Col>
                    ))
                ) : (
                    <Asset src={NoResults} message={`No results found, ${profile?.user} hasn't posted any recipes yet.`} />
                )}
            </Row>

            {profileRecipes.results.length > displayedRecipesCount && (
                <Button className="my-3" onClick={handleLoadMore}>Load More Recipes</Button>
            )}
        </>
    );

    return (
        <Row>
            
            <Col className="py-2 p-5 p-lg-5" lg={12}>


                {hasLoaded ? (
                    <>
                        {profileDetails}
                        {recipeList}
                        {favoritedList}
                    </>
                ) : (
                    <Asset spinner />
                )}

            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
                <PopularProfiles mobile />
            </Col>
        </Row>
    );
}

export default ProfilePage;
