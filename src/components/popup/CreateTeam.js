import { useState,useContext } from "react";
import PopupInputBox from "../Input/PopupInput";
import Modal from "./index"
import { CreateButton } from "../button/CreateButton";
import { AddSvg } from "@/assets/images";
import { StateContext } from "@/context/StateContext";
const CreateTeam =({isOpen,closeModal, title, onClick})=>{
    const { token, api_url, phoneNumber,setSetTeamId} = useContext(StateContext)
    const [name, setName] = useState("");
    const handleCreate =async()=>{
        let options ={
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${token}`
            },
            method:'POST',
            body:`{
                "name":"${name}"
            }`
        }
        await fetch(`${api_url}/team/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    setSetTeamId(res.teamId)
                    closeModal();
                    onClick();
                    
                }
            })
    }
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title} category={"team"}>
            <div className="mt-5 flex flex-col gap-5">
                <PopupInputBox value={name} setValue={setName} placeholder={'Team Name'} />
                <div className="flex-end ml-auto">
                    <CreateButton title="Add" onClick={handleCreate} size="big">
                        <AddSvg color="#FFFFFF" />
                    </CreateButton>
                </div>
            </div>
             
        </Modal>
    )
}

export default CreateTeam;