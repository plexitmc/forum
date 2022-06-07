import tw from 'twin.macro';

export default function Loading() {

    return (
        <div css={tw`flex flex-col justify-center items-center h-screen`}>
            <svg css={tw`animate-spin h-16 w-16 text-white`} viewBox="0 0 24 24" fill='none'>
                <circle css={tw`opacity-10`} cx="12" cy="12" r="10" stroke="#ff8c00" strokeWidth="4"/>
                <path css={tw`opacity-75`} fill="#ff8c00" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
        </div>
    )
}