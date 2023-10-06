import { ReminderSvg } from "@/assets/images";
import ButtonArrow from "../ButtonArrow";
import Text13 from "../Text/Text13";
import Text15 from "../Text/Text15";
import LogoMark from "../chat/LogoMark";
import { GrayButton } from "../button/CreateButton";
import ActiveReminderLayout from "../ActiveReminderLayout";
import OnTimeCompletionRate from "./OnTimeCompletionRate";
import AverageCompletionTime from "./AverageCompletionTime";
import FinishedTasks from "./FinishedTasks";
import AssignedTask from "./AssignedTask";
import CompletedTasks from "./CompletedTasks";
import TeamComparison from "./TeamComparison";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "@/context/StateContext";
const AnalyticsReminder = ({ data,setData }) => {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [state, setState] = useState([]);
    const handleGetState = async () => {
        await fetch(`${api_url}/reminders/stats/${phoneNumber}`, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleGetState()
    }, [])
    const handleExport = () => {
        console.log("")
    }
    const handleDeleteAll = async() => {
        let options = {
            method: 'DELETE',
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
        }
        await fetch(`${api_url}/reminders/deleteAll/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.success){
                    setData([]);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div className="py-5 px-6 flex flex-col gap-4 w-[330px] rounded-r-lg h-full relative"
            style={{ background: 'linear-gradient(0deg, #222222, #222222), #E0DCF9' }}>
            <div className="flex flex-col gap-4 h-full max-h-[763px] overflow-y-auto overscroll w-full">
                <div className="flex items-center justify-between">
                    <Text15 title="Anayltics" color="white" />
                    <GrayButton
                        size="big"
                        title="Export"
                        onClick={handleExport}
                    />
                </div>
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
                    <ButtonArrow title="Delete All" onClick={handleDeleteAll} />
                </ActiveReminderLayout>
                <OnTimeCompletionRate />
                <AverageCompletionTime />
                <TeamComparison />
                <FinishedTasks />
                <AssignedTask />
                <CompletedTasks />
            </div>


            {/* <div className="absolute flex items-center text-center justify-center top-1/2 left-1/2 -translate-x-1/2">
                <Text15 title="Maybe more analytics here?" color="white" />
            </div> */}
        </div>
    )
}

export default AnalyticsReminder;