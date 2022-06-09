import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";

export default function PageNotFound(){
    return (
        <PageContent title="404 - Page not found">
            <Error error="Page not found"/>
        </PageContent>
    )
}