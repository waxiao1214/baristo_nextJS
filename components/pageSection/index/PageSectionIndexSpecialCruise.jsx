import ProductCard from '../../product/ProductCard'
import { useTranslation } from 'react-i18next';

const PageSectionIndexSpecialCruise = ({ specialCruises }) => {
    const { t } = useTranslation(['home']);

    return (<section className="special-cruise pd-100">
        <div className="container">
            <h2 className="title"><span>{t('special_cruise')}</span></h2>
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