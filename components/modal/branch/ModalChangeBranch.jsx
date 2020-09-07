import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Link from 'next/link'

const ModalChangeBranch = ({ close, isActive }) => {
  const { t } = useTranslation(['common']);
  const { branches } = useSelector((state) => state.root.settings);

  if (!isActive) {
    return '';
  }

  return (
    <div>
      <div className="modal fade modal-box show" id="search-filter" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-top">
              <h2 className="title">
                <span>{t('change_the_branch')}</span>
              </h2>
              <button
                onClick={close} type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close" /> </button>
            </div>
            <div className="modal-main">
              <div className="container">
                <div className="cols">
                  <div className="col-12">
                    {branches.map(branch => {
                      return (
                        <Link href={`/${branch.primaryBranch ? '' : branch.id}`} key={branch.id}>
                          <a className="btn btn-link mx-auto btn--no-shadow w-100 mb-2">{branch.branchName}</a>
                        </Link>
                      );
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  )
}

export default ModalChangeBranch;