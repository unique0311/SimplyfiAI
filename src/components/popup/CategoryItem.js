import { useContext, useState } from "react";
import PopupInputBox from "../Input/PopupInput";
import Modal from "./index"
import {CreateButton} from "../button/CreateButton";
import SelectBox from "../Input/SelectBox";
import { StateContext } from "@/context/StateContext";
const CategoryItem=({isOpen,closeModal,title})=>{
    const {api_url,phoneNumber,token} = useContext(StateContext);
    // create an item
    const [ItemName, setItemName] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemSalePrice, setItemSalePrice] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const handleCreate =()=>{
        
        closeModal()
    }
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title}>
            <div className="flex flex-col gap-5 mt-8">
            <PopupInputBox value={ItemName} setValue={setItemName} placeholder={'Item Name'} />
            <div className="grid grid-cols-2 items-center gap-[18px]">
                <PopupInputBox value={ItemPrice} setValue={setItemPrice} placeholder={'Item Price'} />
                <PopupInputBox value={ItemSalePrice} setValue={setItemSalePrice} placeholder={'Item Sale Price'} />
            </div>
            <div className="w-full relative">
                <SelectBox value={categoryName} setValue={setCategoryName} placeholder="Select Category" />
            </div>
            <div className="flex-end ml-auto">
                <CreateButton title="Create" onClick={handleCreate} size="big"/>
            </div>
            </div>
        </Modal>
    )
}

export default CategoryItem;