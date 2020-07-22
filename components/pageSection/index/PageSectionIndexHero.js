import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from '../../../lib/axios'


const PageSectionIndexHero = () => {
    const [slides, setstate] = useState([]);
    const { t, i18n } = useTranslation();

    const fetchData = async () => {
        try {
            const url = `customer/web/home-service/carousel?branchId=1&culture=${i18n.language}`
            const response = await axios.get(url);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [slides]);

    return (<section className="banner">
        <div className="banner-slider">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div className="banner-item" style={{ background: `url('images/picture/banner.png') no-repeat right bottom /cover` }}>
                        <div className="banner-text">
                            <div className="container">
                                <h4>We supply</h4>
                                <h3>The Highest Quality And Tasty Food</h3>
                                <button className="btn btn-h80 btn-yellow inflex-center-center">EXPLORE <i className="ti-arrow-right"></i> </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="banner-item" style={{ background: `url('images/picture/banner.png') no-repeat right bottom /cover` }}>
                        <div className="banner-text">
                            <div className="container">
                                <h4>We supply</h4>
                                <h3>The Highest Quality And Tasty Food</h3>
                                <button className="btn btn-h80 btn-yellow inflex-center-center">EXPLORE <i className="ti-arrow-right"></i> </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

    </section>)
}

export default PageSectionIndexHero;