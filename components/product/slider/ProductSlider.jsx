import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductSliderSlide from './ProductSliderSlide';
import BaseLoader from '../../base/BaseLoader';

SwiperCore.use([Navigation]);

const ProductSlider = ({ close, isActive, isLoading }) => {
	if (!isActive) return '';

	return (
		<div>
			<div className="modal fade full-box show" id="product-detail">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="product-details">
							<button
								type="button"
								className="close"
								onClick={close}
							>
								<i className="ti-close" />
							</button>
							<div className="detail-slider">
								{isLoading && BaseLoader}
								<Swiper
									spaceBetween={20}
									slidesPerView={1}
									navigation
								>
									<SwiperSlide>
										<ProductSliderSlide />
									</SwiperSlide>
									<SwiperSlide>
										<ProductSliderSlide />
									</SwiperSlide>
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show" />
		</div>
	);
};

export default ProductSlider;
