import useUser from '../components/api/swr/useUser';

export default function Test() {

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    if(isLoading) return "Loading..."

    return (
        <>{user.avatar}</>
    )
}