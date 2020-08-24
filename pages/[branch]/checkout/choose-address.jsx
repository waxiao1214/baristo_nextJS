/* eslint-disable jsx-a11y/label-has-associated-control */
import { isUndefined } from 'lodash';
import Link from 'next/link';
import usePageOnLoad from '../../../hooks/page/usePageOnLoad';
import i18n from '../../../i18n/i18n';
import DefaultLayout from '../../../layouts/DefaultLayout';
import useUserFetchCurrentUser from '../../../hooks/user/useUserFetchCurrentUser';
import TheHeader from '../../../components/header/TheHeader';
import TheFooter from '../../../components/footer/TheFooter';
import axios from '../../../lib/axios';

const getSettings = async () => {
  try {
    const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export async function getServerSideProps(context) {
  if (isUndefined(context.params)) {
    if (context.res) {
      context.res.statusCode = 404
      context.res.end('Not found');
      return <ErrorPage />
    }
  }

  const branchId = context.params.branch;
  const settings = await getSettings();

  // get current branch
  const { branches } = settings;
  const currentBranch = branches.filter(
    (branch) => branch.id.toString() === branchId
  )[0];

  return {
    props: {
      settings,
      currentBranch,
    },
  };
}

export default function Index(props) {
  useUserFetchCurrentUser();
  usePageOnLoad(props);

  const { currentBranch } = props;

  return (
    <DefaultLayout>
      <TheHeader />
      <section className="wrapper-gray">
        <div className="container">
          <div className="choose-address wrapper-white pd-55">
            <div className="flex-center-between mgb-40">
              <h1 className="font-24 font-demi flex-center">
                <img src="images/icon/icon-pin-3.svg" alt="" />
                <span className="mgl-10">Shipping Address</span>
              </h1>
              <div className="group-btn-170">
                <button
                  className="btn btn-white btn-h46 font-16 font-demi"
                  onClick="window.location.href= base_url + 'add-new-address.html'"
                  type="button"
                >
                  <i className="ti-plus mgr-10" /> ADD NEW
                                </button>
              </div>
            </div>
            <div className="table-responsive-md">
              <table className="table table-choose">
                <tbody>
                  <tr>
                    <td valign="middle">
                      <label className="checkbox-box relative">
                        <input type="checkbox" name="check-1" className="hide-abs" />
                        <span />
                      </label>
                    </td>
                    <td>
                      <div className="font-24 addres-name">Rivalle Ackerman</div>
                    </td>
                    <td>
                      <div className="font-24 addre">Ct3-2 building, Downer street(near Keangnam lake), Domihat district, Hanoi</div>
                      <div className="group-button-2">
                        <button type="button" className="btn-default">Edit</button>
                        <button type="button" className="btn-default">Remove</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td valign="middle">
                      <label className="checkbox-box relative">
                        <input type="checkbox" name="check-1" className="hide-abs" />
                        <span />
                      </label>
                    </td>
                    <td>
                      <div className="font-24 addres-name">Rivalle Ackerman</div>
                    </td>
                    <td>
                      <div className="font-24 addre">Ct3-2 building, Downer street(near Keangnam lake), Domihat district, Hanoi</div>
                      <div className="group-button-2">
                        <button type="button" className="btn-default">Edit</button>
                        <button type="button" className="btn-default">Remove</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td valign="middle">
                      <label className="checkbox-box relative">
                        <input type="checkbox" name="check-1" className="hide-abs" />
                        <span />
                      </label>
                    </td>
                    <td>
                      <div className="font-24 addres-name">Rivalle Ackerman</div>
                    </td>
                    <td>
                      <div className="font-24 addre">Ct3-2 building, Downer street(near Keangnam lake), Domihat district, Hanoi</div>
                      <div className="group-button-2">
                        <button type="button" className="btn-default">Edit</button>
                        <button type="button" className="btn-default">Remove</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="group-btn-170 mgt-30">
              <button type="button" className="btn btn-yellow btn-h46 font-16 mgr-15">DONE</button>
              <Link
                type="button"
                href="/[branch]/checkout"
                as={`/${currentBranch.id}/checkout`}
              >
                <buttton
                  type="button"
                  className="btn btn-white btn-h46 font-16"
                >
                  GO BACK
                </buttton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <TheFooter />
    </DefaultLayout>
  );
}