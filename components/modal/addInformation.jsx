import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';


const getSettings = async (fullAddress, long, lat, postalCode) => {
	try {
		const url = `settings/nearest-branch?fullAddress=${fullAddress}${lat!==''??'&lat=' + lat}${long !== ''?? '&lng=' + long}${postalCode !== ''?? '&postalCode=' + postalCode}`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const AddInformation = (props) => {
	const router = useRouter();
  const { t, i18n } = useTranslation(['common']);
  const fullAddress = useRef(null);
  const long = useRef(null);
  const lat = useRef(null);
  const postalCode = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (router.pathname === '/') {
      setStart(false);
    } else {
      setStart(true);
    }
  }, [])

  const onClose = (e) => {
    setStart(true);
  }

  const onGoSite = async () => {
    if (postalCode?.current || fullAddress?.current || long?.current || lat?.current) {
      const res =  await getSettings(fullAddress?.current?.value, long?.current?.value, lat?.current?.value, postalCode?.current?.value);
      setStart(true);
      if (res.zone?.branchId) {
		    router.push(`/${res.zone.branchId}`);
      }
    }
  }

  if (start) return '';

  return (
    <div>
			<div className="modal fade modal-box show" id="search-filter">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title" style={{marginTop: '40px'}}>
								<span>{t('Add your Information')}</span>
							</h2>
							<button
								type="button"
                className="close"
                onClick={onClose}
							>
								<i className="ti-close"></i>
							</button>
						</div>
						<div className="modal-main">
              <div className="form-group row" style={{marginBottom: '20px', marginTop: '30px'}}>
                <label htmlFor="fullAddress" className="col-md-3 col-xs-6 col-sm-4 col-form-label" style={{textAlign: 'end'}}>FullAddress:</label>
                <div className="col-sm-8 col-xs-6 col-md-9 ">
                  <input type="text" className="form-control" id="fullAddress" ref={fullAddress} placeholder="Lehenmattstrasse 242 4052 Basel" style={{width: '90%'}}/>
                </div>
                </div>
                <div className="form-group row" style={{marginBottom: '20px'}}>
                  <label htmlFor="lang" className="col-md-3 col-xs-6 col-sm-4 col-form-label" style={{textAlign: 'end'}}>Longitude:</label>
                  <div className="col-sm-8 col-xs-6 col-md-9 ">
                    <input type="text" className="form-control" id="lang" ref={long} placeholder="23" style={{width: '90%'}}/>
                  </div>
                </div>
                <div className="form-group row" style={{marginBottom: '40px'}}>
                  <label htmlFor="lat" className="col-md-3 col-xs-6 col-sm-4 col-form-label" style={{textAlign: 'end'}}>Latitude:</label>
                  <div className="col-sm-8 col-xs-6 col-md-9 ">
                    <input type="text" className="form-control" id="lat" ref={lat} placeholder="32" style={{width: '90%'}}/>
                  </div>
                </div>
                <div className="form-group row" style={{marginBottom: '40px'}}>
                  <label htmlFor="postalCode" className="col-md-3 col-xs-6 col-sm-4 col-form-label" style={{textAlign: 'end'}}>Postal Code:</label>
                  <div className="col-sm-8 col-xs-6 col-md-9 ">
                    <input type="text" className="form-control" id="postalCode" ref={postalCode} placeholder="123423" style={{width: '90%'}}/>
                  </div>
                </div>
                <div className="text-center btn-modal-submit">
									<button
                    className="btn btn-yellow btn-h60 font-20 font-demi"
                    onClick={onGoSite}
									>
										{t('Go to Site')}
									</button>
								</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
  );
}

export default AddInformation;