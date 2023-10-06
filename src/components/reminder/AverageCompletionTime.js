import Image from "next/image";
import Text12 from "../Text/Text12";
import Text15 from "../Text/Text15";
import Text24 from "../Text/Text24";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const OnTimeChart = dynamic(
    () => import("../chart/AverageChart"),
    { ssr: false }
);
const AverageCompletionTime = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true); // Mark the component as being rendered on the client side
    }, []);
    return (
        <div className="flex flex-col gap-2 py-[15px] px-2 w-full average-bg">
            <div className="flex flex-col gap-2 px-2">
            <div className="flex flex-col gap-1.5 w-full">
                <Text15
                    color="white"
                    title="Average Completion Time" />
                <Text12
                    color="[#FFFFFFB2]"
                    text="Your Statistics" />
            </div>
            <div className="flex items-center gap-2.5">
                <Text24 title="4h 23m" color="white" />
                <div className="flex items-center justify-center text-center text-xs font-medium text-white/70 rounded-[48px] bg-[#259F4726] py-[3px] px-[7px]">
                    + 2.3%
                </div>
            </div>
            <Text12
                color="[#FFFFFFB2]"
                text="Team Statistics" />
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <Image
                            alt="discord-user"
                            src={"https://media.discordapp.net/attachments/1107681683974660117/1144704918767292616/Recordings_City_rainbow_hue_logo_but_the_city_is_on_a_white_bac_218684c6-5652-4984-abf8-f73b5f1a28e8.png"}
                            className=" rounded-[40px]"
                            width={36}
                            height={36} />
                        <Text15
                            color="white"
                            title="Boss-1" />
                    </div>
                    <div className="flex items-center justify-center text-center text-xs font-medium text-white/70 rounded-[48px] bg-white/10 py-[3px] px-2.5">
                        12h 43m
                    </div>
                </div>
            </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1.5 w-full px-2">
                    <Text15
                        color="white"
                        title="Average Completion Chart" />
                    <Text12
                        color="[#FFFFFFB2]"
                        text="Team Statistics" />
                </div>
                {isClient && <OnTimeChart />}

            </div>

        </div>
    )
}

export default AverageCompletionTime;