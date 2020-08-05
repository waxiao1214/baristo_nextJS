import DefaultLayout from '../../layouts/DefaultLayout';
import TheHeader from '../../components/header/TheHeader'
import TheFooter from '../../components/footer/TheFooter'
import usePageOnLoad from '../../hooks/page/usePageOnLoad';
import axios from '../../lib/axios';

const getSettings = async () => {
    try {
        const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`
        const response = await axios.get(url);

        return response.data.result;
    } catch (error) {
        console.error(error);

        return [];
    }
}

export async function getServerSideProps(context) {
    const branchId = context.params.branch;
    const settings = await getSettings();

    // get current branch 
    const { branches } = settings;
    const currentBranch = branches.filter(branch => branch.id.toString() === branchId)[0];

    return {
        props: {
            settings,
            currentBranch
        },
    }
}

export default function Gallery(props) {
    usePageOnLoad(props);

    return (
        <DefaultLayout>
            <TheHeader />
            <TheFooter />
        </DefaultLayout>
    )
}