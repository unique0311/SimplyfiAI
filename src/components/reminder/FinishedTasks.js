import { CheckedBoxSvg, TickSquareSvg } from "@/assets/images";
import ActiveReminderLayout from "../ActiveReminderLayout";
import LogoMark from "../chat/LogoMark";
import Text15 from "../Text/Text15";
import Text24 from "../Text/Text24";

const FinishedTasks = () => {
    return (
        <ActiveReminderLayout>
            <div className="flex items-center gap-3">
                <LogoMark>
                    <TickSquareSvg />
                </LogoMark>
                <div className="flex flex-col">
                    <Text15
                        color="white"
                        title="Finished Tasks" />
                    <Text24
                        color="white"
                        title="532" />
                </div>
            </div>
        </ActiveReminderLayout>
    )
}

export default FinishedTasks;