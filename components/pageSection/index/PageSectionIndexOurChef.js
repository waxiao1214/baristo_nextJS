const PageSectionIndexOurChef = ({chefStory}) => {
    const { medias } = chefStory;
    const verticalMedias = medias.slice(1);
    
    return (<section className="our-chef pd-100">
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="our-chef-left">
                        <h2 className="title text-left">
                            <span>{chefStory.title}</span>
                        </h2>
                        <div className="desc font-24 mgb-20">
                            {chefStory.description}
                        </div>
                        <div className="font-demi font-20 mgb-10">JOHN KENERDY</div>
                        <p className="font-demi font-16 text-xam">CO-FOUNDER</p>
                        <div className="social flex-center font-18 mgt-30">
                            <a href="" title="" className="fa fa-facebook"></a>
                            <a href="" title="" className="fa fa-twitter"></a>
                            <a href="" title="" className="fa fa-pinterest"></a>
                        </div>
                        <div className="signatures mgt-30">
                            <img src="images/picture/signatures.png" alt="" title="" />
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="our-chef-right">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="slider slider-for">
                                    <div className="item-for">
                                        <img src={medias[0].mediaLink} alt="" title="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="slider slider-nav">
                                    {
                                        verticalMedias.map((media) => {
                                            return (
                                                <div className="item-nav">
                                                    <div className="item-nav-cache">
                                                        <img src={media.mediaLink} alt="" title="" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexOurChef;