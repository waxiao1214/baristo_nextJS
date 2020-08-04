import GoogleMapReact from 'google-map-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const Marker = () => {
    return (<div><img className="icon-pin" src="./images/icon/pin.svg"/></div>)
}

const PageSectionIndexOurLocation = () => {
	const { t } = useTranslation(['common']);
    const { longitude, latitude } = useSelector(
		(state) => state.root.currentBranch
	);

    if (_.isNil(longitude) || _.isNil(latitude)) return '';

	return (
		<section className="our-location pd-100">
			<div className="container">
				<h2 className="title">
					<span>Our’s Location</span>
				</h2>
				<div className="location-map relative">
					<GoogleMapReact
						bootstrapURLKeys={{
							key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
						}}
						defaultCenter={{
							lat: 60.1699,
							lng: 24.9384,
						}}
						defaultZoom={14}
					>
						<Marker lat={60.1699} lng={24.9384} />
					</GoogleMapReact>
				</div>
				<div className="text-center">
					<button className="btn btn-h80 btn-white font-20 font-demi inflex-center-center">
						{t('contact_us')}
					</button>
				</div>
			</div>
		</section>
	);
};

export default PageSectionIndexOurLocation;
