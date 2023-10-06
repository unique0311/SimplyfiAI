import Image from "next/image";
import searchIcon from "@/assets/images/search.svg"
const SearchInput =({placeholder, value, onChange, text, className,onClick})=>{
    return (
        <div className={className}>
            <span className="flex items-center gap-1 bg-[rgba(98,82,223,0.2)] p-2.5  rounded-l-lg rounded-r-none">
                <span className="font-inter font-medium text-purple-400 text-sm leading-4">{text}</span>
                <Image alt="search-icon" src={searchIcon} />
            </span>
            <input 
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e)}
                onClick={onClick}
                onKeyPress={(e)=>{
                    if(e.key==="Enter"){
                        onClick()
                    } else{
                        onClick()
                    }
                }}
                className="bg-transparent border-none flex flex-1 items-center pl-3  rounded-3xs text-sm leading-4 font-inter text-primary placeholder:text-primary placeholder:text-sm outline-none w-full" />
        </div>
    )
}

export default SearchInput;