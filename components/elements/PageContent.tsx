import Meta from "./Meta";
import Appshell from "../pages/appshell/Appshell";

export default function PageContent({ title, admin, children }: { title?: string, admin?: boolean, children: any}) {
    return (
        <>
            {title && <Meta title={title} />}
            <Appshell admin={admin}>
                {children}
            </Appshell>
        </>
    )
}