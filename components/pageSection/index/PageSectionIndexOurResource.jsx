const PageSectionIndexOurResource = ({appResources}) => {
    return (<section className="our-resource pd-60">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="resource-cover">
                        <img src={appResources.imageLink} alt="" title="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="resource-link">
                        <h2 className="title text-left"><span>{appResources.title}</span></h2>
                        <div className="desc font-20">{appResources.description}</div>
                        <div className="dowload-app">
                            <span>Dowload App: </span>
                            <a href={appResources.playStoreLink} title=""><img src="images/icon/google-play.svg" alt="" title="" /> </a>
                            <a href={appResources.appStoreLink} title=""><img src="images/icon/app-store.svg" alt="" title="" /> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default PageSectionIndexOurResource;