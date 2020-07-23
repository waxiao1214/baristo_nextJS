import ProductChefItemCard from '../../product/ProductChefItemCard'

const PageSectionIndexChefsChoices = ({ chefChoices }) => {
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
                {
                    chefChoices.map(chefChoice => {
                        return (
                            <div className="col-md-4" key={chefChoice.id}>
                                <ProductChefItemCard chefChoice={chefChoice}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>)
}

export default PageSectionIndexChefsChoices;