import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const HeaderTop = () => {
    const { languages } = useSelector((state) => state.settings);
    const { t, i18n } = useTranslation();
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
    };

    const dropdown = (isActive) => {
        if (isActive) {
            return (
                <ul className="choice-lang">
                    {
                        languages.map((language) => {
                            return (
                                <li key={language.name}>{language.name}</li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    return (<section className="header-top">
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-6">
                    <div className="header-top_left flex-center">
                        <div className="header-reser">
                            <span className="mgr-10">RESERVATION: </span>
                            <a href="" title="">1-800-32-345-0230</a>
                        </div>
                        <a href="" title="" className="header-booking">ONLINE BOOKING <i className="fa fa-calendar"></i> </a>
                    </div>
                </div>
                <div className="col-md-6 col-6">
                    <div className="header-top_right flex-center-end">
                        <div className="language">
                            <span className="language-value" onClick={toggleLanguageDropdown}>{i18n.language}</span>
                            {dropdown(isLanguageDropdownOpen)}
                        </div>
                        <div className="social flex-center">
                            <span>FOLLOW US:</span>
                            <a href="" title="" className="fa fa-facebook"></a>
                            <a href="" title="" className="fa fa-pinterest"></a>
                            <a href="" title="" className="fa fa-twitter"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default HeaderTop;