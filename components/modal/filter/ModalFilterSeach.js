import React, { useState } from 'react';

const ModalFilterSearch = ({ isActive, close}) => {
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);

    const handlePriceFromChange = (e) => {
        const val = parseInt(e.target.value);
        if (val < 0) {
            return;
        }
        setPriceFrom(val);
    }

    const handlePriceToChange = (e) => {
        const val = parseInt(e.target.value);
        if (val < 0) {
            return;
        }
        setPriceTo(val);
    }

    if (!isActive) {
        return '';
    }

    return (
        <div>
            <div className="modal fade modal-box show" id="search-filter" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-top">
                            <h2 className="title"><span>Search with Filter</span></h2>
                            <button onClick={close} type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close"></i> </button>
                        </div>
                        <div className="modal-main">
                            <form>
                                <div className="price-range">
                                    <h3 className="modal-title-md"><img src="images/icon/local_atm_24px_rounded.svg" alt="" title="" />Price range </h3>
                                    <div className="range-box">
                                        <span>From</span>
                                        <div className="formRow--input-wrapper js-inputWrapper">
                                            <input
                                                type="number"
                                                className="formRow--input js-input"
                                                value={priceFrom}
                                                onChange={handlePriceFromChange}
                                                placeholder="00.0"
                                            />
                                        </div>
                                        <span className="mgl-15">To</span>
                                        <div className="formRow--input-wrapper js-inputWrapper">
                                            <input
                                                type="number"
                                                className="formRow--input js-input"
                                                value={priceTo}
                                                onChange={handlePriceToChange}
                                                placeholder="00.0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="category-choose">
                                    <h3 className="modal-title-md"><img src="images/icon/restaurant_menu_24px_rounded.svg" alt="" title="" />Category </h3>
                                    <ul className="category-list">
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Main Meal</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Oriental Cuisine</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Fast Meal</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Dessert</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Vegetarian</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="label-check relative">
                                                <input type="checkbox" className="hide-abs" />
                                                <span>Drinks</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center btn-modal-submit"><button type="button" className="btn btn-yellow btn-h60 font-20 font-demi" data-target="#sign-in" data-toggle="modal">APPLY</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>

    );
};

export default ModalFilterSearch;