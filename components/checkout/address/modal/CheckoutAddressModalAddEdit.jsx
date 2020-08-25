const CheckoutAddressModalAddEdit = ({ close }) => {
    return (
        <div>
            <div className="modal fade modal-box show" id="search-filter" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-top">
                            <h2 className="title">
                                <span>Add new address</span>
                            </h2>
                            <button
                                onClick={close} type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close" /> </button>
                        </div>
                        <div className="modal-main">
                            <div className="container">
                                <div className="cols">
                                    <div className="col-12">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </div>
    );
}

export default CheckoutAddressModalAddEdit;