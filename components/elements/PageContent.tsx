import Meta from "./Meta";
import Sidebar from '../pages/sidebar/Sidebar'

export default function PageContent({ title, children }: { title?: string, children: any}) {
    return (
        <>
            {title && <Meta title={title} />}
            <div className="container">
                <Sidebar/>
                {children}
            </div>
        </>
    )
}