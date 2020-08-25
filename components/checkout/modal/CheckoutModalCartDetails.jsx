import { useDispatch, useSelector } from 'react-redux';
import { toggleCartDetailsModal } from '../../../store/actions/cart.actions';
import { withTranslation } from '../../../i18n/i18n';

const CheckoutModalCartDetails = ({ t }) => {
    const dispatch = useDispatch();
    const { isCartDetailsModalActive } = useSelector(state => state.cart);

    const boundtoggleCartDetailsModal = () => dispatch(toggleCartDetailsModal());

    if (!isCartDetailsModalActive) {
        return <div />;
    }

    return (
        <div>
            <div className="customize-food show">
                <div className="customize-main relative" style={{maxWidth: '580px'}}>
                    <div className="customize-top relative">
                        <h2 className="title">
                            <span>{t('your_cart')}</span>
                        </h2>
                        <button type="button" className="close close-customize" onClick={boundtoggleCartDetailsModal}>
                            <i className="ti-close" />
                        </button>
                    </div>
                    <div>
                        asdf
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default withTranslation()(CheckoutModalCartDetails);