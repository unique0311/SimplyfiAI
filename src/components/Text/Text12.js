const Text12 =({
    color,
    text
})=>{
    return (
        <span className={`text-xs leading-4 text-${color} text-[#FFFFFFB2] font-inter font-medium`}>
            {text}
        </span>
    )
}

export default Text12;