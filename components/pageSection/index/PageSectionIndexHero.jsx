import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from '../../../lib/axios';

const PageSectionIndexHero = () => {
    const [slides, setSlides] = useState([]);
    const { t, i18n } = useTranslation();

    const fetchData = async () => {
        try {
            const url = `customer/web/home-service/carousel?branchId=1&culture=${i18n.language}`
            const response = await axios.get(url);

            setSlides(response.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    const actionButton = (slide) => {
        if (slide.isActionButtonAvailable) {
            return (<a
                className="btn btn-h80 btn-yellow inflex-center-center"
                href={slide.actionButtonLink}
            >
                {slide.actionButtonText}<span> </span><i className="ti-arrow-right"></i>
            </a>);
        } else {
            return '';
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (<section className="banner">
        <div className="banner-slider">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {slides.map((slide, index) => {
                    return (<SwiperSlide key={index}>
                        <div className="banner-item" style={{ background: `url(${slide.imageUrl}) no-repeat right bottom /cover` }}>
                            <div className="banner-text">
                                <div className="container">
                                    <h4>{slide.preText}</h4>
                                    <h3>{slide.mainText}</h3>

                                    {actionButton(slide)}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                })}
            </Swiper>
        </div>

    </section>)
}

export default PageSectionIndexHero;