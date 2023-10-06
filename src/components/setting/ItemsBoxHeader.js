import { UserSvg,TeamSvg } from "@/assets/images";
import Text15 from "../Text/Text15";
import LogoMark from "../chat/LogoMark";

const ItemsBoxHeader =({children, title})=>{
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[9px]">
                <LogoMark size="small">
                    {title.includes("Edit")?<UserSvg />:<TeamSvg />}
                </LogoMark>
                <Text15 title={title} color={'white'} />
            </div>
            {children}
        </div>
    )
}

export default ItemsBoxHeader;