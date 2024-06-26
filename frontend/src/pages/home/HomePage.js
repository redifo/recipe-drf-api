import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import PopularProfiles from '../profiles/PopularProfiles';
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/Home.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import 'swiper/swiper-bundle.css';
import RecipeCard from '../recipes/RecipeCard';
import { showError } from '../../utils/ToastManager';
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';


function Home() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [mostFavoritedRecipes, setMostFavoritedRecipes] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);
  const currentUser = useCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);
  //https://stackoverflow.com/questions/63052586/react-swiperjs-autoplay-not-making-the-swiper-to-auto-swipe
  SwiperCore.use([Autoplay])
  SwiperCore.use([Navigation])
  SwiperCore.use([Pagination])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const [mostFavoritedResponse, latestResponse] = await Promise.all([
          axiosRes.get("/recipes/most-favorited"),
          axiosRes.get("/recipes")
        ]);
        setMostFavoritedRecipes(mostFavoritedResponse.data.results);
        setLatestRecipes(latestResponse.data.results);
        setHasLoaded(true);
      } catch (err) {
        showError("Failed to fetch recipes", err.message);
        setHasLoaded(true);
      }
    };
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    // Redirect to the recipes page with the search term in the URL if the search field is not empty
    if (searchQuery.trim()) {
      history.push(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };



  return (
    <>
      <Row className={`justify-content-center my-4 ${styles.SearchRow}`}>
        <InputGroup className={`mb-3 ${styles.SearchInputGroup}`}>
          <FormControl
            className={`${styles.SearchInput}`}
            placeholder="Search Recipes"
            aria-label="SearchRecipes"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" className={styles.SearchButton} onClick={handleSearch}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
        {currentUser && (

          <Container className={`${styles.CreateRecipeBox} p-3 text-center`}>
            <p>Use the button below or click the '+' icon in the navigation bar/menu to create and share a new recipe.</p>
            <Button
              className={btnStyles.Yellow}
              onClick={() => history.push('/recipe/create')}
            >
              Create Recipe
            </Button>
          </Container>

        )}
      </Row>

      <Container fluid className={styles.Container}>
        <h2>Most Favorited Recipes</h2>
        {hasLoaded ? (
          <Swiper
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              100: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            navigation
          >
            {mostFavoritedRecipes.map(recipe => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Asset spinner message="Loading most favorited recipes..." />
        )}



        <h2 className='mt-4'>Most Followed Chefs</h2>

        <PopularProfiles card={true}></PopularProfiles>



        <h2 className='mt-3'>What's new</h2>
        {hasLoaded ? (
          <Swiper
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              100: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            navigation
          >
            {latestRecipes.map(recipe => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Asset spinner message="Loading latest recipes..." />
        )}
      </Container>
    </>
  );
}

export default Home;
