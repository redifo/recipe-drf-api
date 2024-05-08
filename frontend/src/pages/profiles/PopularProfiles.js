import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile, card }) => {
  const { popularProfiles } = useProfileData();

  return (
    <>
      {popularProfiles.results.length ? (
        <>
          {card ? (
            <Swiper
              spaceBetween={30}

              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              navigation
              pagination={{ clickable: true }}
              
            >
              {popularProfiles.results.map(profile => (
                <SwiperSlide key={profile.id}>
                  <Profile profile={profile} imageSize={85} mobile={mobile} card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="d-flex flex-wrap justify-content-around">
              {popularProfiles.results.map(profile => (
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
