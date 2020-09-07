import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BaseSocialLink from '../base/BaseSocialLink';
import useSocialMediaLinks from '../../hooks/useSocialMediaLinks';
import _ from 'lodash';

const TheFooter = () => {
	const {
		contactDetails,
		streetName,
		streetNumber,
		city,
		branchSchedules,
	} = useSelector((state) => state.root.currentBranch);
	const { tenantDetails } = useSelector((state) => state.root.settings);

	const socialLinks = useSocialMediaLinks(tenantDetails.socialLinks);
	const logo = useSelector((state) => state.logo);

	const [schedulesToShow, setBranchesToShow] = useState([]);
    const [isAllSchedulesVisible, setIsAllSchedulesVisible] = useState(false);
    
    const toggleAllSchedulesVisible = () => {
        setIsAllSchedulesVisible(!isAllSchedulesVisible);
    }

	useEffect(() => {
		if (_.isNil(branchSchedules)) return;

		const type1 = branchSchedules.filter((schedule) => schedule.type === 1).reverse();

		if (isAllSchedulesVisible) {
			setBranchesToShow(type1);
		} else {
			setBranchesToShow(type1.slice(0, 4));
		}
	}, [isAllSchedulesVisible, branchSchedules]);

	return (
		<section className="footer" style={{clear: 'both'}}>
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<div className="footer-1">
							<div className="logo-footer">
								<a href="" title="">
									<img src={logo} alt="" title="" />{' '}
								</a>
							</div>
							<div className="desc font-16">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Aenean ut turpis lacinia. Etiam
								suscipit sapien a convallis{' '}
							</div>
							{socialLinks.length !== 0 && (
								<div className="social">
									{socialLinks.map((link, index) => {
										return (
											<BaseSocialLink
												link={link}
												key={index}
											/>
										);
									})}
								</div>
							)}
						</div>
					</div>
					<div className="col-md-4">
						{contactDetails && (
							<div className="footer-2">
								<h4>CONTACT INFO</h4>
								<div className="footer-info footer-address">
									<span>
										{streetNumber && `${streetNumber},`}
										{streetName && ` ${streetName}`}
										{city && `, ${city}`}
									</span>
								</div>
								<div className="footer-info footer-phone">
									<a href={`tel:${contactDetails.workPhone}`}>
										{contactDetails.workPhone}
									</a>
								</div>
								<div className="footer-info footer-mail">
									<a href={`mailto:${contactDetails.email}`}>
										{contactDetails.email}
									</a>
								</div>
								<div className="footer-info footer-clock">
									{schedulesToShow.map((schedule, index) => {
										return (
											<div
												className="flex-center-between"
												key={index}
											>
												<span>
													{schedule.weekDayText}
												</span>
												<span>
													{`${schedule.from.substr(
														0,
														5
													)} - ${schedule.to.substr(
														0,
														5
													)}`}
												</span>
											</div>
										);
									})}
									{/* seem more less button  */}
									<a
										className="link-footer"
										onClick={toggleAllSchedulesVisible}
									>
										{isAllSchedulesVisible
											? 'See less'
											: 'See more'}
									</a>
								</div>
							</div>
						)}
					</div>
					<div className="col-md-4"></div>
					<div className="col-md-12">
						<div className="footer-bottom flex-center-between">
							<div className="footer-article flex-center">
								<a href="" title="">
									TERM & CONDITION
								</a>
								<a href="" title="">
									POLICY
								</a>
							</div>
							<div className="copyright">
								Copyrights 2019{' '}
								<a href="" title="">
									Baristo
								</a>{' '}
								. All rights reserved
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TheFooter;
