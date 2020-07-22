const PageSectionIndexChefsChoices = () => {
    return (<section className="chef-choice pd-100">
        <div className="container">
            <h2 className="title"><span>Chef’s Choice</span></h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="chef text-center">
                        <div className="chef-image"><span className="img-circle"><img src="images/picture/chef.png" alt="" title="" /></span></div>
                        <div className="chef-name">
                            <h5 className="font-18 font-demi">FRANKCIS</h5>
                            <p className="font-demi">MASTERCHEF</p>
                        </div>
                        <p className="quote-image"><img src="images/icon/left-quote.svg" alt="" title="" /> </p>
                        <p className="chef-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="chef-item relative">
                        <div className="ch-image"><a href="" title=""><img src="images/picture/choice-1.png" alt="" title="" /> </a> </div>
                        <div className="ch-text text-center">
                            <h3 className="title-sm mgb-10"><a href="" title="">Healthy Meal</a> </h3>
                            <p className="desc text-gray font-18">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia.</p>
                        </div>
                        <div className="text-center order-abs">
                            <button className="btn btn-yellow btn-h60 font-18 font-demi" data-toggle="modal" data-target="#product-detail">ORDER NOW</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="chef-item relative">
                        <div className="ch-image"><a href="" title=""><img src="images/picture/choice-2.png" alt="" title="" /> </a> </div>
                        <div className="ch-text text-center">
                            <h3 className="title-sm mgb-10"><a href="" title="">Healthy Meal</a> </h3>
                            <p className="desc text-gray font-18">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia.</p>
                        </div>
                        <div className="text-center order-abs">
                            <button className="btn btn-yellow btn-h60 font-18 font-demi " data-toggle="modal" data-target="#product-detail">ORDER NOW</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="chef-item relative">
                        <div className="ch-image"><a href="" title=""><img src="images/picture/choice-3.png" alt="" title="" /> </a> </div>
                        <div className="ch-text text-center">
                            <h3 className="title-sm mgb-10"><a href="" title="">Healthy Meal</a> </h3>
                            <p className="desc text-gray font-18">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut turpis lacinia.</p>
                        </div>
                        <div className="text-center order-abs">
                            <button className="btn btn-yellow btn-h60 font-18 font-demi " data-toggle="modal" data-target="#product-detail">ORDER NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexChefsChoices;