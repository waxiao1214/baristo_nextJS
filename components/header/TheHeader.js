import HeaderBottom from './HeaderBottom';
import HeaderTop from './HeaderTop';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const TheHeader = () => {
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            window.scrollY > ref.current.getBoundingClientRect().bottom
                ? setSticky(true)
                : setSticky(false)
        }
    }

    // const debounce = (func, wait = 20, immediate = true) => {
    //     let timeOut
    //     return () => {
    //       let context = this,
    //         args = arguments
    //       const later = () => {
    //         timeOut = null
    //         if (!immediate) func.apply(context, args)
    //       }
    //       const callNow = immediate && !timeOut
    //       clearTimeout(timeOut)
    //       timeOut = setTimeout(later, wait)
    //       if (callNow) func.apply(context, args)
    //     }
    // }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll)
        }
    }, [handleScroll]);

    return (
        <div className={`${isSticky ? 'sticky': 'header-wrapper'}`} ref={ref}>
            <section className="header-top">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-6 col-10">
                        <HeaderBottom />
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-6 col-2">
                        <HeaderTop />
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TheHeader;