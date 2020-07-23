const PageSectionIndexOurRestaurant = ({ subBanner }) => {
    return (<section className="our-restaurant">
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-6">
                    <div className="our-res-right">
                        <h2 className="title text-left">
                            <span>{subBanner.title}</span>
                        </h2>
                        <div className="desc font-20">
                            {subBanner.description }
                        </div>
                        <p className="our-button">
                            <button
                                herf={subBanner.mediaLink}
                                className="btn btn-white btn-h60 font-demi"
                            >
                                {subBanner.actionButtonText}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexOurRestaurant;