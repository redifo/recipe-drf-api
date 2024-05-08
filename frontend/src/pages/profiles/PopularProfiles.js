import React from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import styles from "../../styles/PopularProfiles.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile, card }) => {
  const { popularProfiles } = useProfileData();

  //helper for creating carousels with different no of items according to screen size
  const createCarouselSlides = (profiles, profilesPerSlide) => {
    let slides = [];
    for (let i = 0; i < profiles.length; i += profilesPerSlide) {
      slides.push(profiles.slice(i, i + profilesPerSlide));
    }
    return slides.map((slideProfiles, index) => (
      <Carousel.Item key={index}>
        <Row className={`justify-content-center ${styles.CustomRow}`}>
          {slideProfiles.map(profile => (
            <Col className={`${styles.Card}`} key={profile.id} xs={12} md={6} lg={4}>
              <Profile profile={profile} imageSize={75} mobile={mobile} card={card} />
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    ));
  };
  return (
    <>
      {popularProfiles.results.length ? (
        <>
          
          {card ? (
            <Carousel interval={4000} indicators={true} wrap={true}>
              {createCarouselSlides(popularProfiles.results, mobile ? (window.innerWidth < 768 ? 1 : 2) : 4)}
            </Carousel>
          ) : (
            <div className="d-flex flex-wrap justify-content-around">
              {popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} mobile={mobile} card={card} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </>
  );
};

export default PopularProfiles;
