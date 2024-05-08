import React from "react";
import {Container, Carousel} from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile, card }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}>
      {popularProfiles.results.length ? (
        <>
          {card ? (
            <Carousel interval={5000} indicators={false}>
              {popularProfiles.results.map((profile) => (
                <Carousel.Item key={profile.id}>
                  <Profile profile={profile} mobile={mobile} card={card} />
                </Carousel.Item>
              ))}
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
    </Container>
  );
};

export default PopularProfiles;
