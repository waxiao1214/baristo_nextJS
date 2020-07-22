const PageSectionIndexOurLocation = () => {
    return (<section className="our-location pd-100">
        <div className="container">
            <h2 className="title"><span>Our’s Location</span></h2>
            <div className="location-map relative">
                <img src="images/picture/World-Map-Free-PNG-Image.png" alt="" title="" />
                <div className="location-item location-item-1 absolute">
                    <div className="location-image text-center">
                        <span className="relative"><img src="images/picture/place-in-saigon-cafe-truong-sa.jpg" title="" alt="" /> </span>
                    </div>
                    <p className="text-center">123 Street, Knightsbridge,</p>
                    <h3 className="text-center">Central London</h3>
                </div>
                <div className="location-item location-item-2 absolute">
                    <div className="location-image text-center">
                        <span className="relative"><img src="images/picture/place-in-saigon-cafe-truong-sa.jpg" title="" alt="" /> </span>
                    </div>
                    <p className="text-center">123 Street, Knightsbridge,</p>
                    <h3 className="text-center">Central London</h3>
                </div>
            </div>
            <div className="text-center"><button className="btn btn-h80 btn-white font-20 font-demi inflex-center-center" tabindex="0">CONTAC US</button></div>
        </div>
    </section>)
}

export default PageSectionIndexOurLocation;