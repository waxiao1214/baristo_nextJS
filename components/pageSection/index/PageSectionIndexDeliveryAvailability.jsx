import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from '../../../lib/axios';

const PageSectionIndexDeliveryAvailability = () => {
    const [postalCodes, setPostalCodes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [deliveryMessage, setDeliveryMessage] = useState('');
    const { t } = useTranslation(['common']);
    const { id: branchId } = useSelector(state => state.root.currentBranch);

    const getPostalCodes = async (val) => {
        try {
            const url = `customer/web/home-service/postal-codes?postalCodeSearch=${val}`
            const response = await axios.get(url);

            return response.data.result;
        } catch (error) {
            console.error(error);

            return [];
        }
    };

    const deliveryCheck = async (val) => {
        try {
            const url = `customer/web/home-service/delivery-check?branchId=${branchId}&postalCode=${val}`
            const response = await axios.get(url);

            return response.data.result;
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    const handleCheckDelivery = async (e) => {
        let message;
        e.preventDefault();
        const result = await deliveryCheck(inputValue);
        const { specialMessage, isDeliveryAvailable } = result;
        if (isDeliveryAvailable) {
            message = specialMessage || t('available');
            setDeliveryMessage(message);
        } else {
            message = specialMessage || t('not_available');
            setDeliveryMessage(message);
        }
    }

    const handleChange = async (e) => {
        setPostalCodes([]);
        setDeliveryMessage('');
        setInputValue(e.target.value);

        const codes = await getPostalCodes(e.target.value);

        setPostalCodes(codes);
    }

    const selectPostalCode = (code) => {
        setPostalCodes([]);
        setInputValue(code);
    }

    return (<section className="check-deliver pd-60">
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="text-center font-32 font-demi mgb-10">Looking Forward To Serve You</h4>
                    <div className="desc font-20 text-center mgb-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien a convallis lobortis. </div>
                    <form>
                        <input
                            type="text"
                            placeholder="2 Rue Notre-Dame, 2240 Luxembourg"
                            className="input-white mgb-30"
                            value={inputValue}
                            onChange={handleChange}
                        />
                        {postalCodes.length === 0 ? '' :
                            <ul className="list-group" style={{ 'marginBottom': '2rem' }}>
                                {
                                    postalCodes.map(code => {
                                        return (
                                            <li
                                                className="list-group-item"
                                                key={code.id}
                                                style={{ 'cursor': 'pointer' }}
                                                onClick={selectPostalCode.bind(this, code.zip)}
                                            >
                                                {code.zip}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                        {
                            deliveryMessage ?? ''
                        }
                        <p className="text-center">
                            <button
                                type="submit"
                                className="btn btn-white btn-h60"
                                onClick={handleCheckDelivery}
                            >
                                CHECK DELIVERY AVAILABILITY
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexDeliveryAvailability;