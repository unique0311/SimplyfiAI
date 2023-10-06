const InputBox =({value, setValue, placeholder, role})=>{
    return (
       <div className="relative">
         <input 
            type="text" 
            placeholder={placeholder} 
            className="bg-gray-1200 border-px border-[#2B2B2B] outline-none flex items-center pl-4 pr-[19px] h-10 rounded-lg text-sm leading-4 font-inter font-medium text-primary placeholder:text-primary  w-full"
            value={value} 
            onChange={(e)=>setValue(e.target.value)} />
            {role !=="" && <span className="absolute top-1/2 -translate-y-1/2 right-5 text-base text-silver font-TTHovesMedium">
                {role}</span>}
       </div>
    )
}

export default InputBox;