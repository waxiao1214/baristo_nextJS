import { useState, useEffect } from 'react';

const useProductPriceAndDiscountValueToShow = (product) => {
    const { mealPrices } = product;
    const [mainMeal, setMainMeal] = useState(mealPrices[0]);

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
        setMainMeal(mealPrices[0]);
        // set the meal price
        // it should be the cheapest one with the highest discount value
        let cheapestMeal = mealPrices[0];
        mealPrices.forEach((mealPrice) => {
            if (cheapestMeal.price > mealPrice.price) {
                cheapestMeal = mealPrice;
            }
        });

        let highestDiscount = cheapestMeal.mealSettings[0];
        cheapestMeal.mealSettings.forEach((mealSetting) => {
            if (!mealSetting.discount) return;
            if (!mealSetting.discount) return;
            if (!highestDiscount.discount) {
                highestDiscount = mealSetting;
                return;
            }
            if (highestDiscount.discount < mealSetting.discount) {
                highestDiscount.discount = mealSetting.discount;
            }
        });

        cheapestMeal.mealSettings = [highestDiscount];
        setMainMeal(cheapestMeal);
    }, [mealPrices]);

    return {
        isDiscountStillInRange,
        mainMeal
    }
}

export default useProductPriceAndDiscountValueToShow;