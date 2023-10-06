const Text15 =({color,title})=>{
    return (
        <span className={`text-xs leading-[15px] lg:text-xxs lg:leading-4 2xl:text-mini 2xl:leading-[18px] font-inter font-semibold text-${color} truncate`}>{title}</span>
    )
}

export default Text15;