import { useContext,useState } from "react";
import { CreateButton } from "../button/CreateButton";
import { AddSvg } from "@/assets/images";
import Modal from "./index"
import PopupInputBox from "../Input/PopupInput";
import SelectBox from "../Input/SelectBox";
import { StateContext } from "@/context/StateContext";

const CreateInventoryItem = ({ isOpen, closeModal, title, category}) => {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [boughtQuantity, setBoughtQuantity] = useState("");
    const [saleQuantity, setSaleQuantity] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const handleCreate = async () => {
        let options ={
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:`{
                "item":"${name}",
                "price":"${price}",
                "boughtQuantity":"${boughtQuantity}",
                "saleQuantity":"${saleQuantity}",
                "salePrice":"${salePrice}"
            }`
          }
          await fetch(`${api_url}/inventory/${phoneNumber}`,options)
          .then(res=>res.json())
          .then(res=>{
            if(res.success){
                setName("");
                setBoughtQuantity("");
                setSalePrice("");
                setPrice("");
                setSaleQuantity("");
                setSelectedValue("");
                closeModal()
            }
          })
          .catch(err=>console.log("error:" + err))
        
    }
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title} category={category}>
            <div className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-2.5">
                    <PopupInputBox value={name} setValue={setName} placeholder={'Item Name'} />
                    <div className="grid grid-cols-2 gap-2.5">
                        <PopupInputBox value={price} setValue={setPrice} placeholder={'Item Price'} />
                        <PopupInputBox value={salePrice} setValue={setSalePrice} placeholder={'Item Sale Price'} />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                        <PopupInputBox value={boughtQuantity} setValue={setBoughtQuantity} placeholder={'Bought Quanlity'} />
                        <PopupInputBox value={saleQuantity} setValue={setSaleQuantity} placeholder={'Sale Quanlity'} />
                    </div>
                    <SelectBox
                        placeholder="Select Document"
                        value={selectedValue}
                        setValue={setSelectedValue} />
                </div>
                <div className="flex-end ml-auto">
                    <CreateButton title="Add" onClick={handleCreate} size="big">
                        <AddSvg color="#FFFFFF" />
                    </CreateButton>
                </div>
            </div>

        </Modal>
    )
}

export default CreateInventoryItem;