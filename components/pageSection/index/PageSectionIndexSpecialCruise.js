import ProductCard from '../../product/ProductCard'

const PageSectionIndexSpecialCruise = ({ specialCruises }) => {
    return (<section className="special-cruise pd-100">
        <div className="container">
            <h2 className="title"><span>Special Cruise</span></h2>
            <div className="row">
                {
                    specialCruises.map(specialCruise => {
                        return (
                            <div className="col-md-4" key={specialCruise.id}>
                                <ProductCard product={specialCruise} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>);
}

export default PageSectionIndexSpecialCruise;