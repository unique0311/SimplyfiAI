const ItemsBox=({children})=>{
    return (
        <div className="border-[0.24px] border-solid border-gray-700 p-5 rounded-md flex flex-col gap-[18px] col-span-2 lg:col-span-1">
             {children}
        </div>
    )
}
export default ItemsBox;