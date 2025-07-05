// src/components/RatingSection.jsx
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../assets/css/home.css'; 
import rating from '../assets/lotties/rating.json';
import { Autoplay } from 'swiper/modules';

const testimonials = [
  {
    text: '“SkillSync helped me land a startup internship in just 2 weeks!”',
    author: '— Riya, BTech Student @ DAIICT',
  },
  {
    text: '“I finally got to mentor bright students and build my own credibility.”',
    author: '— Karan, UX Mentor',
  },
  {
    text: '“As a project creator, I built a talented team from scratch!”',
    author: '— Sanya, Founder @ EduBridge',
  },
];

const Rating = () => {
  return (
    <section className="testimonials-flex-section">
      <div className="testimonial-lottie">
        <Player autoplay loop src={rating} className="rating-animation" />
      </div>

      <div className="testimonial-slider">
        <h2>What People Say</h2>
        <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} autoplay={{ delay: 3000, disableOnInteraction: false }}>

          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card">
                <p>{t.text}</p>
                <span>{t.author}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Rating;
