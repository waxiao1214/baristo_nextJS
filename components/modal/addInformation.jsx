import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';


const getSettings = async (fullAddress, long, lat, postalCode) => {
	try {
    var url;
    var response;
    if (fullAddress || long || postalCode) {
      if (fullAddress) {
        url = `settings/nearest-branch?fullAddress=${fullAddress}`;
      } else if (long) {
        url = `settings/nearest-branch?lat=${lat}&lng=${long}`;
      } else {
        url = `settings/nearest-branch?postalCode=${postalCode}`;
      }
      response = await axios.get(url);
    } else {
      return [];
    }

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
  const [start, setStart] = useState(true);

  useEffect(() => {
    if (router.pathname === '/') {
      const getCurrentPosition = () => {
        return new Promise(resolve => {
          navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            resolve({status: 'allowed', lat, long});
          }, error => {
            if (error.code == error.PERMISSION_DENIED) {
              resolve({status: 'blocked', error})
            } else {
              resolve({status: 'other', error})
            }
          });
        })
      }

      const _process = async () => {
        var position = await getCurrentPosition();
        if (position.status === 'allowed') {
          setStart(true);
          const res =  await getSettings(null, position?.long, position?.lat, null);
          if (res?.zone?.branchId) {
            router.push(`/${res.zone.branchId}`);
          }
        } else {
          setStart(false);
        }
      }
      _process();
    }
  }, [])

  const onClose = (e) => {
    setStart(true);
  }

  const onGoSite = async () => {
    if (fullAddress?.current?.value) {
      if (fullAddress.current.value !== '') {
        var res;
        if (Number(fullAddress.current.value) && fullAddress.current.value.length === 4) {
          res =  await getSettings(null, null, null, fullAddress?.current?.value);
        } else {
          res =  await getSettings(fullAddress?.current?.value, null, null, null);
        }

        if (res?.zone?.branchId) {
          router.push(`/${res.zone.branchId}`);
        }
      }
      setStart(true);
    }
  }

  if (start) return '';

  return (
    <div>
			<div className="modal fade modal-box show" id="search-filter">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title" style={{marginTop: '60px', fontSize: '32px'}}>
								<span>{t('Please Provide Your Address or Postal Code')}</span>
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
              <div className="container">
                <div className="row justify-content-center" style={{marginBottom: '30px', marginTop: '10px'}}>
                  <div className="col-10">
                    <input type="text" className="form-control" ref={fullAddress} placeholder="Lehenmattstrasse 242 4052 Basel"/>
                  </div>
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