import { useState,useContext, useEffect } from "react";
import PopupInputBox from "../Input/PopupInput";
import Modal from "./index"
import {CreateButton} from "../button/CreateButton";
import { AddSvg } from "@/assets/images";
import { StateContext } from "@/context/StateContext";
const CatgeoryPopup=({isOpen,closeModal,title,category})=>{
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [name, setName] = useState("");
    const handleCreate =async ()=>{
        let options={
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method:"POST", 
            body:JSON.stringify({
                category:name
            })
        }
        await fetch(`${api_url}/${category==="inventory"?"category":"documents/category"}/${phoneNumber}`,options)
        .then(res=>res.json())
        .then(res=>{
          if(res.success){
              setName("");
              closeModal()
          }
        })
        .catch(err=>console.log("error:" + err))
        
    }
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title} category={category}>
            <div className="flex flex-col gap-5 mt-4">
            <PopupInputBox value={name} setValue={setName} placeholder={'Category Name'} />
            <div className="flex-end ml-auto">
                <CreateButton title="Add" onClick={handleCreate} size="big">
                    <AddSvg color="#FFFFFF" />
                </CreateButton>
            </div>
            </div>
        </Modal>
    )
}

export default CatgeoryPopup;