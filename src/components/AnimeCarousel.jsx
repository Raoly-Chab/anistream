import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/AnimeCarousel.css"; 

export default function AnimeCarousel({ animes = [], onWatch }) {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="carousel-swiper"
      >
        {animes.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div
              className="carousel-slide"
              onClick={() => onWatch && onWatch(anime)}
            >
              {/* Image de fond floutée */}
              <img
                src={
                  anime.images?.jpg?.image_url ||
                  anime.coverImage?.large ||
                  anime.coverImage?.medium
                }
                alt={
                  anime.title?.romaji ||
                  anime.title?.english ||
                  anime.title?.native ||
                  anime.title
                }
                className="carousel-bg"
              />

              {/* Dégradé sombre */}
              <div className="carousel-gradient" />

              {/* Image principale nette */}
              <img
                src={
                  anime.images?.jpg?.image_url ||
                  anime.coverImage?.large ||
                  anime.coverImage?.medium
                }
                alt={anime.title}
                className="carousel-image"
              />

              {/* Titre en dessous */}
              <div className="carousel-title">
                <h2>
                  {anime.title?.romaji ||
                    anime.title?.english ||
                    anime.title?.native ||
                    anime.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
