import { MasterCardSvg } from "@/assets/images";
import Text13 from "../Text/Text13";

const BillItem = () => {
    return (
        <div className="flex items-center justify-between p-3 bill-bg w-full rounded-lg">
            <div className="flex flex-col gap-1.5 text-[#99999A]">
                <Text13 title="May 10th, 2022" color="[#99999A]" />
                <div className="flex items-center gap-1.5">
                    <span className="font-inter font-semibold text-xl leading-6 text-white">
                        $32.00
                    </span>
                    <div className='rounded-full flex items-center gap-6 justify-between px-2 py-[3px] bg-mediumseagreen'>
                        <span className='font-inter font-semibold text-forestgreen text-xs leading-[15px]'>Paid</span>
                        <span className=' bg-forestgreen rounded-full w-1.5 h-1.5 flex'></span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="bg-white rounded-md flex items-center justify-center py-[5px] px-1.5">
                    <MasterCardSvg />
                </div>
                <Text13 title="1234" color="white" />
            </div>
        </div>
    )
}

export default BillItem;