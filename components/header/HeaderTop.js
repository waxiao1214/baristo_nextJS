import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import BaseSocialLink from '../base/BaseSocialLink';

const HeaderTop = () => {
    const { languages, tenantDetails } = useSelector((state) => state.settings);
    const { t, i18n } = useTranslation();
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState([])

    useEffect(() => {
        const socialLinks = !tenantDetails.socialLinks ? [] : tenantDetails.socialLinks.split(';');

        setSocialLinks(socialLinks);
    }, [tenantDetails])
    
    
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setIsLanguageDropdownOpen(false);
    }

    const dropdown = (isActive) => {
        if (isActive) {
            return (
                <ul className="choice-lang">
                    {
                        languages.map((language) => {
                            return (
                                <li onClick={() => changeLanguage(language.name)} key={language.name}>{language.name}</li>
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
                </div>
                <div className="col-md-6 col-6">
                    <div className="header-top_right flex-center-end">
                        <div className="language">
                            <span className="language-value" onClick={toggleLanguageDropdown}>{i18n.language}</span>
                            {dropdown(isLanguageDropdownOpen)}
                        </div>
                        {
                            socialLinks.length === 0 ? '' :
                            <div className="social flex-center">
                                    <span>FOLLOW US:</span>
                                    {
                                        socialLinks.map((link, index) => {
                                            return (<BaseSocialLink link={link} key={index} />);
                                        })
                                    }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default HeaderTop;