/* eslint-disable jsx-a11y/label-has-associated-control */
import { isUndefined } from 'lodash';
import usePageOnLoad from '../../../hooks/page/usePageOnLoad';
import i18n from '../../../i18n/i18n';
import DefaultLayout from '../../../layouts/DefaultLayout';
import useUserFetchCurrentUser from '../../../hooks/user/useUserFetchCurrentUser';
import TheHeader from '../../../components/header/TheHeader';
import TheFooter from '../../../components/footer/TheFooter';
import axios from '../../../lib/axios';

const getSettings = async () => {
    try {
        const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
        const response = await axios.get(url);

        return response.data.result;
    } catch (error) {
        console.error(error);

        return [];
    }
};

export async function getServerSideProps(context) {
    if (isUndefined(context.params)) {
        if (context.res) {
            context.res.statusCode = 404
            context.res.end('Not found');
            return <ErrorPage />
        }
    }

    const branchId = context.params.branch;
    const settings = await getSettings();

    // get current branch
    const { branches } = settings;
    const currentBranch = branches.filter(
        (branch) => branch.id.toString() === branchId
    )[0];

    return {
        props: {
            settings,
            currentBranch,
        },
    };
}

export default function Index(props) {
    useUserFetchCurrentUser();
    usePageOnLoad(props);

    return (
        <DefaultLayout>
            <TheHeader />
            <section className="wrapper-gray">
                <div className="container">
                    <div className="confirm-checkout wrapper-white pd-55">
                        <div className="cofirm-item">
                            <div className="menu-item menu-item-1 flex-center">
                                <div className="cover-item"><img src="images/picture/special-2.png" alt="" title="" /> </div>
                                <div className="text-item">
                                    <h1 className="font-weight-bold font-36 mgb-10">Healthy Pizza of Seafood</h1>
                                    <div className="desc font-22 text-xam mgb-30">x2 Cheese, Crab, Grimp, no tomato sauce, Sausage</div>
                                    <div className="action-item flex-center font-24 font-medium">
                                        <button type="button" className="btn-default">Remove</button>
                                        <button type="button" className="btn-default">Edit</button>
                                        <button type="button" className="btn-default">Duplicate</button>
                                    </div>
                                </div>
                                <div className="price-item text-yellow font-medium font-56">$ 76.00</div>
                            </div>
                            <div className="menu-item menu-item-2 text-center">
                                <button type="button" className="btn btn-yellow btn-h60 font-20"><i className="ti-plus mgr-10" />ADD ANOTHER MENU ITEM</button>
                            </div>
                            <div className="menu-item menu-item-pick">
                                <h2 className="font-24 font-demi mgb-40 flex-center"><img src="images/icon/icon-clock.svg" alt="" title="" className="mgr-15" />Delivery Time </h2>
                                <div className="box-060">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="label-check relative">
                                                <input type="radio" name="delivery-time" className="hide-abs" checked />
                                                <span>Quickest (11:28 AM)</span>
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="label-check relative check-flex">
                                                <input type="radio" name="delivery-time" className="hide-abs" />
                                                <span>
                                                    <span>Specific Time:</span>
                                                    <input type="text" id="timepicker" className="input-time text-center" value="17 : 3" />
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-item menu-item-pick">
                                <h2 className="font-24 font-demi mgb-40 flex-center"><img src="images/icon/icon-clock.svg" alt="" title="" className="mgr-15" />Pick Up Type </h2>
                                <div className="box-060">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="label-check relative">
                                                <input type="radio" name="pick-type" className="hide-abs" checked />
                                                <span>Pick Up</span>
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="label-check relative">
                                                <input type="radio" name="pick-type" className="hide-abs" />
                                                <span>Delivery</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-item">
                                <h2 className="font-24 font-demi mgb-40 flex-center"><img src="images/icon/icon-pin-3.svg" alt="" title="" className="mgr-15" />Shipping Address </h2>
                                <div className="box-060">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="font-24">Rivalle Ackerman</div>
                                        </div>
                                        <div className="col-md-7 col-10">
                                            <div className="font-24">Banne Réta Restaurant, 1900 Uper street(near Meta lake), Domihat district, Hanoi</div>
                                        </div>
                                        <div className="col-md-2 col-2 flex-center-end">
                                            <button type="button" className="btn-default font-24" onClick="window.location.href= base_url + 'choose-address.html'"><i className="ti-angle-right" /> </button>
                                        </div>
                                    </div>
                                    <div className="note-warning font-18 font-medium mgt-20 text-red flex-center"><img src="images/icon/c-warning.svg" alt="" className="mgr-15" />We're sorry but your address is out of scope, please pick a nearer address </div>
                                </div>
                            </div>
                            <div className="menu-item">
                                <h2 className="font-24 font-demi mgb-40 flex-center"><img src="images/icon/credit-card.svg" alt="" title="" className="mgr-15" />Payment Method </h2>
                                <div className="box-060">
                                    <div className="row">
                                        <div className="col-md-10 col-10">
                                            <div className="font-24"><span className="mgr-15">Paypal</span><img src="images/icon/paypal.svg" alt="" title="" className="mgr-15" /> </div>
                                        </div>
                                        <div className="col-md-2 col-2 flex-center-end">
                                            <button type="button" className="btn-default font-24"><i className="ti-angle-right" /> </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-money">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="total-menu">
                                            <div className="flex-center-between mgb-10">
                                                <span className="font-24 text-ghi">Order Total</span>
                                                <span className="font-weight-bold font-36 text-green">$ 76.00</span>
                                            </div>
                                            <div className="flex-center-between mgb-10">
                                                <span className="font-24 text-ghi">Coupon</span>
                                                <span className="font-weight-bold font-36 text-green">- $10</span>
                                            </div>
                                            <div className="flex-center-between mgb-10">
                                                <span className="font-24 text-ghi">Loyalty Point</span>
                                                <span className="font-weight-bold font-36 text-green">- $10</span>
                                            </div>
                                            <div className="flex-center-end">
                                                <span className="font-weight-bold font-56 text-yellow">$ 76.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="total-promotion">
                                            <div className="flex-center-between mgb-30">
                                                <span className="font-medium font-24 s-33">Coupon</span>
                                                <div className="input-coupon relative">
                                                    <input type="text" value="" placeholder="" />
                                                    <ul id="select-cp">
                                                        <li>CODE 123</li>
                                                        <li>CODE 234</li>
                                                    </ul>
                                                </div>
                                                <button type="button" className="btn btn-white btn-h46 w170 btn-select-cp">Select Coupon</button>
                                                <button type="button" className="btn btn-white btn-h46 w170 btn-removee hide">REMOVE COUPON</button>
                                            </div>
                                            <div className="flex-center-between mgb-60">
                                                <span className="font-medium font-24 s-33">Use Loyalty Point</span>
                                                <span className="input-point"><input type="number" value="10" placeholder="" /></span>
                                                <button type="button" className="btn btn-white btn-h46 w170 btn-usee">USE POINT</button>
                                                <button type="button" className="btn btn-white btn-h46 w170 btn-removee hide">REMOVE POINT</button>
                                            </div>
                                            <button type="button" className="btn btn-block btn-yellow btn-h80 font-24 font-weight-bold" onClick="window.location.href= base_url + 'order-tracking-prepare.html'">CONFIRM CHECK OUT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <TheFooter />
        </DefaultLayout>
    );
}