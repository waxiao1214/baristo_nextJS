/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import BaseLoader from './BaseLoader';

const BaseModal = ({ close, children, title, isLoading }) => {
    return (
        <div>
            <div
                className="modal fade modal-box show"
                onClick={close}
            >
                <div
                    className="modal-dialog"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    {isLoading && <BaseLoader />}
                    <div className="modal-content">
                        <div className="modal-top">
                            <h2 className="title">
                                <span>{title}</span>
                            </h2>
                        </div>
                        <div className="modal-main">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </div>
    );
}

export default BaseModal;