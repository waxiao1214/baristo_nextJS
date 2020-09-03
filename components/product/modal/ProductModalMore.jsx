import React from 'react';

const ProductModalMore = ({ closeModal, product }) => {
  return <div>
    <div className="modal fade full-box show" id="product-more">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="product-details">
            <button type="button" className="close" onClick={closeModal}>
              <i className="ti-close" />
            </button>
            <div className="more-content">
              <div className="ch-more-image">
                <img src = {product.thumbnail}/>
              </div>
              <h3 className="title-sm mgb-10">
                <div className="ch-text_title"><p>{product.title}</p></div>
              </h3>
              <div className="more-wrapper"
                style={{ height: "130px" }}
              >
                <p className="desc text-gray font-18">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show" />
  </div >
}

export default ProductModalMore
