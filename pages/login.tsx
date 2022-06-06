import tw from 'twin.macro'
import { BsDiscord } from 'react-icons/bs'
import Image from 'next/image'

import config from '../config.json';

export default function Login({ props }: { props: any }) {

    const discordOauth = `https://discord.com/oauth2/authorize?client_id=${config.discord.client_id}&redirect_uri=${config.discord.redirect_uri}&response_type=code&scope=identify&prompt=none`;
    
    return (
        <div css={tw`flex flex-col justify-center items-center h-screen`}>
            <div css={tw`flex flex-col w-full max-w-xs`}>
                <div css={tw`flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
                    <div css={tw`my-6`}>
                        <Image src="/logo.svg" alt="logo" width={170*2} height={41*2}/>
                    </div>
                    <a href={discordOauth} css={tw`flex transition leading-none duration-300 border border-white bg-[#5865F2] text-white hover:text-[#5865F2] hover:border-[#5865F2] hover:bg-opacity-10 font-semibold py-3 px-4 rounded `}>
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