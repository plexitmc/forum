import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useUser from "../components/api/swr/useUser";
import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";
import ProfileBox from "../components/pages/profile/ProfileBox";

export default function Page() {

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    return (
        <PageContent title="Your Profile">
            { isError 
            ? <Error /> 
            : (isLoading 
                ? <></> 
                : 
                <ProfileBox user={user}/>
            )}
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})