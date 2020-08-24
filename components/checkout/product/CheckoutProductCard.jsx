import { useTranslation } from "react-i18next";

import { useSelector } from 'react-redux';

const CheckoutProductCard = () => {
  const { currency } = useSelector((state) => state.root.settings);

  return (
    <div className="menu-item menu-item-1 flex-center">
      <div className="cover-item">
        <img src="/images/picture/special-2.png" alt="" title="" />
      </div>
      <div className="text-item">
        <h1 className="font-weight-bold font-36 mgb-10">Healthy Pizza of Seafood</h1>
        <div className="desc font-22 text-xam mgb-30">x2 Cheese, Crab, Grimp, no tomato sauce, Sausage</div>
        <div className="action-item flex-center font-24 font-medium">
          <button type="button" className="btn-default">Remove</button>
          <button type="button" className="btn-default">Edit</button>
          <button type="button" className="btn-default">Duplicate</button>
        </div>
      </div>
      <div className="d-flex align-items-center price-item text-yellow font-medium font-56"><span className="mr-2 font-24">{`${currency}`}</span> 76.00</div>
    </div>);
}

export default CheckoutProductCard;