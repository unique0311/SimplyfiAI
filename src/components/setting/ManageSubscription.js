import { ReminderSvg } from "@/assets/images";
import Text15 from "../Text/Text15";
import LogoMark from "../chat/LogoMark";
import ButtonArrow from "../ButtonArrow";
import { CreateButton } from "../button/CreateButton";
import ArrowRight from "@/assets/images/sidebar/arrowRight";
import BillItem from "./BillsItem";
import ActiveReminderLayout from "../ActiveReminderLayout";

const ManageSubscription = ({ page }) => {
    const bills = Array(5).fill("")
    const handleUpdateStripe = () => {
        console.log("")
    }
    return (
        <div className="py-[27px] px-[22px] flex flex-col gap-6 lg:w-[330px] rounded-r-lg h-full"
            style={{ background: 'linear-gradient(0deg, #222222, #222222), #E0DCF9' }}>
            <Text15 title="Manage Subscription" color="white" />
            <div className="flex flex-col gap-3.5">
                {page === "setting" && <div className="flex flex-col gap-3.5">
                    <ActiveReminderLayout>
                        <div className="flex items-center gap-3">
                            <LogoMark>
                                <ReminderSvg color="black" />
                            </LogoMark>
                            <div className="flex flex-col">
                                <Text15 title="Expiration Date" color="white" />
                                <Text15 title="21 Days" color="white" />

                            </div>
                        </div>
                        <span className="text-2xl leading-[29px] text-white font-inter font-semibold">
                            May 10th, 2023
                        </span>
                    </ActiveReminderLayout>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <ButtonArrow title="Renew" />
                        <CreateButton title="Update Stripe" onClick={handleUpdateStripe}>
                            <ArrowRight color="white" />
                        </CreateButton>
                    </div>
                </div>}

            </div>

        </div>
    )
}

export default ManageSubscription;