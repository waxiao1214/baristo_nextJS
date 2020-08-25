import { useState, useEffect } from 'react';
import { isNil } from 'lodash';

// {
//   "openMoreDetails": "ƒ openMoreDetails() {}",
//   "product": {
//     "title": "Family Meal",
//     "description": null,
//     "comboMealPrices": "[{…}]",
//     "imagePath": "https://soreadwrite.blob.core.windows.net/so-container/1/MenuGallery/Meal/85ceacd6-27fa-4c7b-a722-1513113c0457.jpg",
//     "thumbnail": null,
//     "comboMealCategoryId": 0,
//     "id": 6
//   }
// }

const useProductPriceAndDiscountValueToShow = (product) => {
    const { mealPrices } = product;
    const [mainMeal, setMainMeal] = useState({});

	/**
	 * Check if the discount is still
	 * valid in terms of date range
	 * @param {*} from
	 * @param {*} to
	 * @return {Boolean}
	 */
    const isDiscountStillInRange = (from, to) => {
        if (!from || !to) return false;

        const fromDate = new Date(from);
        const toDate = new Date(to);
        const now = new Date();

        if (now < fromDate || now > toDate) return false;

        return true;
    };

    useEffect(() => {
        if (!mealPrices) return;

        setMainMeal(mealPrices[0]);
        // set the meal price
        // it should be the cheapest one with the highest discount value
        let cheapestMeal = mealPrices[0];
        let highestDiscount = {};
        mealPrices.forEach((mealPrice) => {
            if (cheapestMeal.price > mealPrice.price) {
                cheapestMeal = mealPrice;
            }
            // set highest discount rate
            mealPrice.mealSettings.forEach(mealSetting => {
                if (!mealSetting.discount) return;
                if (!highestDiscount.discount) {
                    highestDiscount = mealSetting;
                    return;
                }
                if (highestDiscount.discount < mealSetting.discount) {
                    highestDiscount.discount = mealSetting.discount;
                }
            })
        });

        cheapestMeal.mealSettings = [highestDiscount];
        setMainMeal(cheapestMeal);
    }, [mealPrices]);

    if (isNil(mealPrices)) return {
        isDiscountStillInRange: false,
        mainMeal: {}
    }

    return {
        isDiscountStillInRange,
        mainMeal
    }
}

export default useProductPriceAndDiscountValueToShow;