import tw from 'twin.macro';

const Error = ({ title, error}: { title: string, error: string }) => {
    return (
        <div css={tw`flex flex-col justify-center items-center h-screen bg-red-500 bg-opacity-10`}>
            {title && <h1 css={tw`text-center text-red-500 font-bold`}>{title}</h1>}
            {error && <p css={tw`text-center text-red-500 font-normal`}>{error}</p>}
        </div>
    )
}

Error.defaultProps = {
    title: "Oh snap!",
    error: "Something went wrong."
}


export default Error;