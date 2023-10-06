import ArrowRight from "@/assets/images/sidebar/arrowRight";
const SelectBox = ({ value, setValue, data, placeholder }) => {
    return (
        <div className="relative">
            <select style={{
                backgroundColor: '#141414',
                color: "#dfdfdf"
            }}
                className="input-bg border border-solid border-[#2B2B2B] bg-[#141414]  flex items-center py-3 px-4 rounded-lg text-sm leading-[17px] font-inter text-primary truncate placeholder:text-primary font-medium  outline-none w-full appearance-none"
                value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="default">{placeholder}</option>
                {
                    Array.isArray(data) ? data.map((item, index) => (
                        <option value={item.value} key={index}>{item.name}</option>
                    )) : null
                }
            </select>
            <span className="w-5 h-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 rotate-90">
                <ArrowRight color="#86878A" />
            </span>
        </div>
    )
}

export default SelectBox;