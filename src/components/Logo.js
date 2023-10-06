import logo from "@/assets/images/logo.svg"
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex items-center gap-1">
            <Image alt="logo" src={logo} width={72} height={72} priority />
            <b className="text-xl leading-6 inline-block text-white font-inter font-semibold">
                SimplifyAI
            </b>
        </div>
    )
}

export default Logo;