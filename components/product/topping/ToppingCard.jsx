import { useSelector } from 'react-redux';

const ToppingCard = () => {
  const { currency } = useSelector((state) => state.root.settings);

  return (
    <div className="optional-item">
      <div className="row">
        <div className="col-md-5">
          <div className="optional-image">
            <img src="images/picture/optional-1.png" />
          </div>
        </div>
        <div className="col-md-7">
          <div className="optional-info">
            <h4 className="font-24 font-medium">x2 Cheese</h4>
            <div className="font-weight-bold font-32 text-yellow">
              {`${currency}`}10
            </div>
            <button
              type="button"
              className="btn-remove-op btn-optional font-18 font-demi mgt-30"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToppingCard;
