import { useTranslation } from "react-i18next";

const ProductModalConfirmMeal = ({ isActive, close }) => {
  const { t } = useTranslation(['common']);

  if (!isActive) return '';

  return (<div>
    <div className="modal fade modal-box show" id="confirm-meal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-top">
            <h2 className="font-32 font-demi text-center mgb-30">
              <span>{t('confirm')}</span>
            </h2>
          </div>
          <div className="modal-main">
            <div className="desc font-20 text-center">
              {t('move_current_meal_or_stay')}
            </div>
            <div className="text-center mgt-30">
              <button
                type="button"
                className="btn btn-yellow btn-h60 font-20 font-demi w230 mgr-15"
              >
                {t('move')}
              </button>
              <button
                type="button"
                className="btn btn-white btn-h60 font-20 font-demi w230"
                onClick={close}
              >
                {t('keep_customizing')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal-backdrop fade show"
    ></div>
  </div>)
};

export default ProductModalConfirmMeal;