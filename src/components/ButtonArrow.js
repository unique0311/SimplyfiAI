import ArrowRight from "@/assets/images/sidebar/arrowRight";
import Text13 from "./Text/Text13";
const ButtonArrow = ({ title,onClick }) => {
    return (
        <button 
            className="border-none bg-white rounded-[7px] flex items-center justify-between w-full py-2 px-4"
            onClick={onClick}
        >
            <Text13 color="black-third" title={title} />
            <ArrowRight color="#86878A" />
        </button>
    )
}

export default ButtonArrow;