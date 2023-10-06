import { ReminderSvg } from "@/assets/images";
import LogoMark from "../chat/LogoMark";
import ActiveReminderLayout from "../ActiveReminderLayout";
import Text15 from "../Text/Text15";
const MobileAnalyticsReminder = ({data}) => {
    return (
        <div className="flex xl:hidden rounded-r-lg w-full h-full relative">
            <ActiveReminderLayout>
                <div className="flex items-center gap-3">
                    <LogoMark>
                        <ReminderSvg color="black" />
                    </LogoMark>
                    <div className="flex flex-col">
                        <Text15 title="Active Reminders" color="white" />
                        {
    data && 
    <span className="text-2xl leading-[29px] text-white font-inter font-semibold">
        {data.filter(item => item.status !== "completed").length}
    </span>
}

                    </div>
                </div>
            </ActiveReminderLayout>
        </div>
    )
}

export default MobileAnalyticsReminder;