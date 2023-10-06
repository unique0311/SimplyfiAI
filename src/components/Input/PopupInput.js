const PopupInputBox =({value, setValue, placeholder})=>{
    return (
       <div className="relative">
         <input 
            type="text" 
            placeholder={placeholder} 
            className="input-bg border-px border-[#2B2B2B]  flex items-center py-3 px-4 rounded-lg text-sm leading-[17px] font-inter text-primary placeholder:text-primary font-medium  outline-none w-full"
            value={value} 
            onChange={(e)=>setValue(e.target.value)} />
       </div>
    )
}

export default PopupInputBox;