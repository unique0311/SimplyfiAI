import { useContext, useEffect, useState } from "react";
import PopupInputBox from "../Input/PopupInput";
import Modal from "./index"
import { CreateButton } from "../button/CreateButton";
import { AddSvg } from "@/assets/images";
import Text13 from "../Text/Text13";
import { StateContext } from "@/context/StateContext";
const SetUpEmail = ({ isOpen, closeModal, title, category }) => {
    const { api_url, phoneNumber, token } = useContext(StateContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [time, setTime] = useState("");
    const [receive, setReceive] = useState("");
    async function getForwardEmail() {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
        await fetch(`${api_url}/debriefingsetting/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                setEmail(res.result.catchall);
                setReceive(res.result.preference);
                setTime(res.result.time);
                setName(res.result.email)
            })
            .catch(err => console.log("error:", err))
    }
    useEffect(() => {
        getForwardEmail()
    }, [])
    const handleCreate = async () => {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: `{
                "email":"${name}","preference":"${receive}","time":"${time}"
            }`
        }
        await fetch(`${api_url}/debriefingsetting/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    closeModal()
                }
            })
            .catch(err => console.error('error:' + err));


    }
    const handleCache =async()=>{
        await fetch(`${api_url}/debriefingsetting/${phoneNumber}`,{
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${token}`,
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(err => console.error('error:' + err));

    }
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title} category={category}>
            <div className="flex flex-col gap-5 mt-4">
                <div className="flex items-end gap-3 justify-between w-full">
                    <div className="flex flex-col gap-2 flex-1">
                        <Text13 color="primary" title="User Email" />
                        <PopupInputBox value={name} setValue={setName} placeholder={'Enter User Email'} />
                    </div>
                    <button onClick={handleCache} className="text-white font-inter font-semibold h-[43px] leading-4 text-xxs  send-bg py-2 px-6 rounded-lg">
                        Catch all
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <Text13 color="primary" title="Forwarder Email" />
                    <PopupInputBox value={email} setValue={setEmail} placeholder={'Enter Forwarder Email'} />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col gap-2 col-span-1">
                        <Text13 color="primary" title="Time" />
                        <input
                            type="time"
                            name="time"
                            placeholder="Enter Time (AM/PM)"
                            value={time}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-1 rounded-3xs text-sm font-inter font-medium text-primary w-full outline-none select-none"
                            onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 col-span-1">
  <Text13 color="primary" title="Receive" />
  <select
    className="input-bg border-px border-[#2B2B2B] p-2 rounded-3xs text-sm font-inter font-medium text-primary w-full outline-none select-none"
    value={receive}
    onChange={(e) => setReceive(e.target.value)}
  >
    <option value="">Select Receive Method</option>
    <option value="Email">Email</option>
    <option value="SMS">SMS</option>
    <option value="Whatsapp">Whatsapp</option>
    <option value="Email + SMS">Email + SMS</option>
    <option value="Email + Whatsapp">Email + Whatsapp</option>
  </select>
</div>

                </div>

                <div className="flex-end ml-auto">
                    <CreateButton title="Setup" onClick={handleCreate} size="big">
                        <AddSvg color="#FFFFFF" />
                    </CreateButton>
                </div>
            </div>
        </Modal>
    )
}

export default SetUpEmail;