import { useState, useEffect } from 'react';

const BaseSocialLink = ({ link }) => {
    const [socialPlatform, setSocialPlatform] = useState('');
    const regex = RegExp(/facebook|twitter|pinterest|youtube|instagram/g);

    useEffect(() => {
        const matches = link.match(regex) || [];
        if (matches.length !== 0) {
            setSocialPlatform(matches[0]);
        }
    }, []);

    return (<a href={link} className={`fa fa-${socialPlatform}`}></a>)
}

export default BaseSocialLink;