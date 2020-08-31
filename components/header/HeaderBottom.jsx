/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import ModalFilterSearch from '../modal/filter/ModalFilterSeach';
import ModalChangeBranch from '../modal/branch/ModalChangeBranch';
import {
	toggleRegistrationModal,
	toggleLoginModal,
} from '../../store/actions/authentication.actions';
import useUserIsLoggedIn from '../../hooks/user/useUserIsLoggedIn';

const HeaderBottom = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const logo = useSelector((state) => state.root.logo);
	const { branchName, id: branchId } = useSelector((state) => state.root.currentBranch);
	const { t } = useTranslation(['common']);
	const [isFilterModalActive, setIsFilterModalActive] = useState(false);
	const [isBranchModalActive, setIsBranchModalActive] = useState(false);
	const [searchText, setSearchText] = useState('');

	const isUserLoggedIn = useUserIsLoggedIn();

	const boundToggleRegistrationModal = () =>
		dispatch(toggleRegistrationModal());

	const boundToggleLoginModal = () => dispatch(toggleLoginModal());

	const handleSearchTextChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleFilterSearch = (data) => {
		setIsFilterModalActive(false);

		data.searchText = searchText;

		const query = queryString.stringify(data);

		router.push(`/${branchId}/menu?${query}`);
	}

	return (
		<div className="header-left">
			<ModalFilterSearch
				isActive={isFilterModalActive}
				close={() => setIsFilterModalActive(false)}
				search={(data) => handleFilterSearch(data)}
			/>
			<ModalChangeBranch
				isActive={isBranchModalActive}
				close={() => setIsBranchModalActive(false)}
			/>
			<div className="container">
				<div className="row">
					<div className="col-md-2 col-lg-2 between-mb flex-center">
						<div className="logo">
							<a href={`/${branchId}/`} title="">
								<img src={logo} alt="" />{' '}
							</a>
						</div>
						<div className="right-mb relative visible-mobile">
							<button className="btn-default btn-search-mb">
								<i className="fa fa-search" />
							</button>
							<button className="btn-default btn-user-mb">
								<i className="fa fa-user-o" />
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
					<div className="col-md-10 col-lg-10">
						<div className="header-main">
							<div className="row">
								<div className="col-lg-6 col-md-4 abs-mb">
									<div className="search-relative relative">
										<form
											className="search"
											onClick={() => setIsFilterModalActive(true)}
											style={{ cursor: 'pointer' }}
										>
											<button type="button">
												<i className="fa fa-search" />
											</button>
											<input
												type="text"
												placeholder="Searching..."
												value={searchText}
												onChange={(e) => handleSearchTextChange(e)}
											/>
										</form>
										<button
											className="btn-tranfer btn-filter"
											type="button"
										>
											<i className="fa fa-filter" />{' '}
										</button>
									</div>
								</div>
								<div className="col-lg-6 col-md-8 visible-desktop">
									<div className="header-action">
										{branchName && (
											<div
												className="link"
												className="location"
												onClick={() =>
													setIsBranchModalActive(true)
												}
											>
												<i className="fa fa-map-marker" />
												{branchName}
											</div>
										)}
										{isUserLoggedIn ? (
											<button>{t('account')}</button>
										) : (
												<div className="btn-join1">
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
		</div>
	);
};

export default HeaderBottom;
