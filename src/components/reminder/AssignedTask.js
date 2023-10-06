import { ReminderMenuSvg } from "@/assets/images";
import LogoMark from "../chat/LogoMark";
import Text15 from "../Text/Text15";
import Text24 from "../Text/Text24";

const AssignedTask = () => {
    return (
        <div className="w-full flex on-time-bg px-[23px] py-5">
            <div className="flex items-center gap-3">
                <LogoMark>
                    <ReminderMenuSvg />
                </LogoMark>
                <div className="flex flex-col">
                    <Text15
                        color="white"
                        title="Current Tasks Assigned" />
                    <Text24
                        color="white"
                        title="21" />
                </div>
            </div>
        </div>
    )
}

export default AssignedTask;