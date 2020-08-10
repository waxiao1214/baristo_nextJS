const ProductModalConfirmMeal = ({ isActive }) => {
    if (!isActive) return '';
    
    return (<div className="modal fade modal-box" id="confirm-meal">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-top">
                    <h2 className="font-32 font-demi text-center mgb-30">
                        <span>Confirm</span>
                    </h2>
                </div>
                <div className="modal-main">
                    <div className="desc font-20 text-center">Move current meal to cart and add another meal?</div>
                    <div className="text-center mgt-30">
                        <button type="button" className="btn btn-yellow btn-h60 font-20 font-demi w230 mgr-15" onClick="window.location.href= base_url + 'menu.html'">Move</button>
                        <button type="button" className="btn btn-white btn-h60 font-20 font-demi w230" data-dismiss="modal">Keep Customize</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
};

export default ProductModalConfirmMeal;