import Image from "next/image";
import Text12 from "../Text/Text12";
import Text15 from "../Text/Text15";
import Text24 from "../Text/Text24";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OnTimeChart = dynamic(
    () => import("../chart/CompletedChart"),
    { ssr: false }
);

const CompletedTasks = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true); // Mark the component as being rendered on the client side
    }, []);
    return (
        <div className="flex flex-col gap-2 py-[15px] px-2 w-full average-bg">
            <div className="flex flex-col gap-1.5 w-full px-2">
                <Text15
                    color="white"
                    title="Tasks Completed By User" />
                <Text12
                    color="[#FFFFFFB2]"
                    text="Based on completion time & rate" />
            </div>
            <div className="flex flex-col divide-y divide-[#505050] space-y-3 pb-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Text15
                        color="white"
                        title="Johnny Smith" />
                    <div className="flex items-center justify-center text-center text-xs font-medium text-[#44BE66] rounded-[48px] bg-[#259F4726] py-[3px] px-2.5">
                        132
                    </div>
                </div>
                <div className="flex items-center justify-between w-full pt-2">
                    <Text15
                        color="white"
                        title="Johnny Smith" />
                    <div className="flex items-center justify-center text-center text-xs font-medium text-[#44BE66] rounded-[48px] bg-[#259F4726] py-[3px] px-2.5">
                        132
                    </div>
                </div>
                <div className="flex items-center justify-between w-full pt-2">
                    <Text15
                        color="white"
                        title="Johnny Smith" />
                    <div className="flex items-center justify-center text-center text-xs font-medium text-[#44BE66] rounded-[48px] bg-[#259F4726] py-[3px] px-2.5">
                        132
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1.5 w-full px-2">
                    <Text15
                        color="white"
                        title="Tasks Completed through time" />
                    <Text12
                        color="[#FFFFFFB2]"
                        text="Team Statistics" />
                </div>
                {isClient && <OnTimeChart />}

            </div>

        </div>
    )
}

export default CompletedTasks;