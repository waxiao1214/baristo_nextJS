import { useState, useEffect } from 'react';

/**
 * Hook that takes a link of 
 * different social media links and breaks them 
 * into different links
 *
 * @param {String} links ;
 */
function useSocialMediaLinks(links) {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        const socialLinks = !links ? [] : links.split(';');

        setSocialLinks(socialLinks);
    }, []);

    return socialLinks;
}

export default useSocialMediaLinks;