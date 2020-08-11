import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ToppingCard = ({ topping, isSelected, onAdd, onRemove, inMeal }) => {
  const { t } = useTranslation(['common']);
  const { currency } = useSelector((state) => state.root.settings);

  return (
    <div className="optional-item">
      <div className="row">
        <div className="col-md-5">
          <div className="optional-image">
            <img src={topping.imagePath} alt={topping.choiceItem} />
          </div>
        </div>
        <div className="col-md-7">
          <div className="optional-info">
            <h4 className="font-24 font-medium">
              {topping.choiceItem}
            </h4>
            <div className="font-weight-bold font-32 text-yellow">
              {`${currency} ${topping.price}`}
            </div>
            {inMeal && (isSelected ? <button
              type="button"
              className="btn-remove-op btn-optional font-18 font-demi mgt-30"
              onClick={() => onRemove(topping.id)}
            >
              {t('remove')}
            </button> :
              <button
                onClick={() => onAdd(topping.id)}
                type="button"
                className="btn-add-op btn-optional font-18 font-demi mgt-30"
              >
                {t('add')}
              </button>)
            }
            {!inMeal &&
              (<div className="d-flex">
                <button
                  type="button"
                  className="btn-remove-op btn-optional font-18 font-demi mgt-30 mr-3"
                  onClick={() => onRemove(topping.id)}
                  disabled={!isSelected}
                >
                  {t('remove')}
                </button>
                <button
                  onClick={() => onAdd(topping.id)}
                  type="button"
                  className="btn-add-op btn-optional font-18 font-demi mgt-30"
                >
                  {t('add')}
                </button>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToppingCard;
