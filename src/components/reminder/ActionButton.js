const ActionButton =({children, background, onClick})=>{
    return (
        <button
            onClick={onClick} 
            className={`flex items-center justify-center bg-${background} rounded-lg p-1.5 xl:p-2 w-[27px] h-[27px] md:w-8 md:h-8`}>
            {children}
        </button>
    )
}

export default ActionButton;