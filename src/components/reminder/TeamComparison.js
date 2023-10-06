import Text12 from "../Text/Text12";
import Text15 from "../Text/Text15";

const TeamComparison = () => {
    return (
        <div className="flex flex-col gap-1.5 team-comparison py-[18px] px-5 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <Text15
                        color="white"
                        title="Team Comparison" />
                    <Text12
                        color="[#FFFFFFB2]"
                        text="Based on completion time & rate" />
                </div>
            </div>
            <div className="flex flex-col divide-y divide-[#505050] space-y-3 pb-2 w-full">
                <div className="flex items-center justify-between pt-3 w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-[#259F4726] text-[13px] font-semibold text-[#44BE66]">
                            1
                        </div>
                        <Text15
                        color="white"
                        title="Johnny Smith" />
                    </div>
                   
                   <div className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-[#7177EC]">
                            342
                        </span>
                        <span className="text-[#7177EC]">
                            /
                        </span>
                        <span className="text-[#479CEB]">
                            95%
                        </span>
                   </div>
                </div>
                <div className="flex items-center justify-between pt-3 w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-[#259F4726] text-[13px] font-semibold text-[#44BE66]">
                            1
                        </div>
                        <Text15
                        color="white"
                        title="Johnny Smith" />
                    </div>
                   
                   <div className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-[#7177EC]">
                            342
                        </span>
                        <span className="text-[#7177EC]">
                            /
                        </span>
                        <span className="text-[#479CEB]">
                            95%
                        </span>
                   </div>
                </div>
                <div className="flex items-center justify-between pt-3 w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-[#259F4726] text-[13px] font-semibold text-[#44BE66]">
                            1
                        </div>
                        <Text15
                        color="white"
                        title="Johnny Smith" />
                    </div>
                   
                   <div className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-[#7177EC]">
                            342
                        </span>
                        <span className="text-[#7177EC]">
                            /
                        </span>
                        <span className="text-[#479CEB]">
                            95%
                        </span>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default TeamComparison;