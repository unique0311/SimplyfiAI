import { MoneySvg, UniteSvg } from "@/assets/images";
import Text12 from "../Text/Text12";
import Text15 from "../Text/Text15";
import LogoMark from "../chat/LogoMark";
import Text24 from "../Text/Text24";

const TotalItem =({title, price, description})=>{
    return (
        <div className={`rounded-[10px] pt-3.5 pb-[18px] pr-4 pl-5 flex flex-col gap-5 ${title==="Total Cost"?"cost-bg":"unit-bg"}`}>
            <div className="flex items-start justify-between gap-4 w-full">
                <div className="flex flex-col gap-1 mt-1">
                    <Text15 color="white" title={title} />
                    <Text12 color="[#FFFFFFB2]" text={description} />
                </div>
                <LogoMark size="big">
                    {title==="Total Cost"?<MoneySvg />:<UniteSvg />}
                </LogoMark>
            </div>
            <Text24 color="white" title={price}  />
        </div>
    )
}

export default TotalItem;