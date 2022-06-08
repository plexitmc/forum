import useUser from '../components/api/swr/useUser';
import Error from '../components/elements/Error';
import Loading from '../components/elements/LoadingScreen';
import PageContent from '../components/elements/PageContent';

export default function Test() {

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    if(isLoading) return <Loading/>
    if(isError) return <Error />
    return (
        <PageContent title="Forside">
        </PageContent>
    )
}