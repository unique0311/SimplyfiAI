import SelectBox from "../Input/SelectBox";
import Text15 from "../Text/Text15";

const MobileCategory = ({ value, setValue, placeholder,data }) => {
    return (
        <div className="flex flex-col xl:hidden gap-3">
            <Text15 title="Categories" color="white" />
            <SelectBox
                value={value}
                setValue={setValue}
                placeholder={placeholder}
                data={data}
            />
        </div>
    )
}

export default MobileCategory;