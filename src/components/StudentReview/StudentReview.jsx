import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import styles from "./StudentReview.module.css";
import studentImage from '../../assets/images/student-image.jfif';
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    name: "Aman Sharma",
    image: studentImage,
    review:
      "This coaching completely changed my life. Faculty support and doubt sessions are amazing!",
  },
  {
    name: "Priya Verma",
    image: studentImage,
    review:
      "Best institute in Kota! Structured learning and regular tests helped me crack my exam.",
  },
  {
    name: "Rahul Meena",
    image: studentImage,
    review:
      "Highly recommended! The environment here motivates you to push your limits.",
  },
];

const StudentReview = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Success Stories</h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{ delay: 7000 }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.swiper}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.card}
              onClick={() => navigate("/Placement")}
              style={{ cursor: "pointer" }}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <p className={styles.review}>"{item.review}"</p>
              <h3 className={styles.name}>{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StudentReview;