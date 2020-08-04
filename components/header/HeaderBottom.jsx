import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalFilterSearch from '../modal/filter/ModalFilterSeach';
import ModalChangeBranch from '../modal/branch/ModalChangeBranch';
import {
	toggleRegistrationModal,
	toggleLoginModal,
} from '../../store/actions/authentication.actions';
import useUserIsLoggedIn from '../../hooks/user/useUserIsLoggedIn';
import { useTranslation } from 'react-i18next';

const HeaderBottom = () => {
	const dispatch = useDispatch();
	const logo = useSelector((state) => state.root.logo);
    const { branchName } = useSelector((state) => state.root.currentBranch);
    const { t } = useTranslation(['common']);
	const [isFilterModalActive, setIsFilterModalActive] = useState(false);
	const [isBranchModalActive, setIsBranchModalActive] = useState(false);

	const isUserLoggedIn = useUserIsLoggedIn();

	const boundToggleRegistrationModal = () =>
		dispatch(toggleRegistrationModal());

	const boundToggleLoginModal = () => dispatch(toggleLoginModal());

	return (
		<section className="header-bottom">
			<ModalFilterSearch
				isActive={isFilterModalActive}
				close={() => setIsFilterModalActive(false)}
			/>
			<ModalChangeBranch
				isActive={isBranchModalActive}
				close={() => setIsBranchModalActive(false)}
			/>
			<div className="container">
				<div className="row">
					<div className="col-md-2 between-mb flex-center">
						<div className="logo">
							<a href="index.html" title="">
								<img src={logo} alt="" />{' '}
							</a>
						</div>
						<div className="right-mb relative visible-mobile">
							<button className="btn-default btn-search-mb">
								<i className="fa fa-search"></i>{' '}
							</button>
							<button className="btn-default btn-user-mb">
								<i className="fa fa-user-o"></i>{' '}
							</button>

							<ul className="user-abs">
								<li onClick={boundToggleLoginModal}>
									<a>Login</a>
								</li>
								<li onClick={boundToggleRegistrationModal}>
									<a>Join Now</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-10">
						<div className="header-main">
							<div className="row">
								<div className="col-md-6 abs-mb">
									<div className="search-relative relative">
										<form className="search">
											<button type="submit">
												<i className="fa fa-search"></i>
											</button>
											<input
												type="text"
												placeholder="Searching..."
											/>
										</form>
										<button
											onClick={() =>
												setIsFilterModalActive(true)
											}
											className="btn-tranfer btn-filter"
											data-target="#search-filter"
											data-toggle="modal"
										>
											<i className="fa fa-filter"></i>{' '}
										</button>
									</div>
								</div>
								<div className="col-md-6 visible-desktop">
									<div className="header-action">
										{branchName && (
											<div
												className="link"
												className="location"
												onClick={() =>
													setIsBranchModalActive(true)
												}
											>
												<i className="fa fa-map-marker"></i>
												{branchName}
											</div>
										)}
										{isUserLoggedIn ? (
											<button>{t('account')}</button>
										) : (
											<div>
												<button
													onClick={
														boundToggleLoginModal
													}
													className="btn-tranfer btn-login"
												>
													LOGIN
												</button>
												<button
													onClick={
														boundToggleRegistrationModal
													}
													className="btn btn-white btn-h60 btn-join"
												>
													JOIN NOW
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeaderBottom;