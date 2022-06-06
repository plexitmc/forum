import tw from 'twin.macro'
import { BsDiscord } from 'react-icons/bs'
import Image from 'next/image'

export default function Login({ props }: { props: any }) {

    return (
        <div css={tw`flex flex-col justify-center items-center h-screen`}>
            <div css={tw`flex flex-col w-full max-w-xs`}>
                <div css={tw`flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
                    <div css={tw`my-6`}>
                        <Image src="/logo.svg" alt="logo" width={170*2} height={41*2}/>
                    </div>
                    <a href="#" css={tw`flex transition leading-none duration-300 border border-white bg-[#5865F2] text-white hover:bg-white hover:text-[#5865F2] hover:border-[#5865F2] font-semibold py-3 px-4 rounded `}>
                        <span css={tw`pr-3`}><BsDiscord/></span> Login with Discord
                    </a>
                </div>
                <div css={tw`flex justify-center`}>
                    <a href="https://plexhost.dk" css={tw`text-gray-500 text-xs`}>
                        © 2022 Centox - A Open Source Project.
                    </a>
                </div>
            </div>
        </div>
    )
}