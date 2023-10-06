import { useContext, useState } from "react";
import InputBox from "../Input/GeneralInput";
import ItemsBox from "./ItemsBox";
import ItemsBoxHeader from "./ItemsBoxHeader"
import { AddButton, CreateButton } from "../button/CreateButton";
import { StateContext } from "@/context/StateContext";
import SelectBox from "../Input/SelectBox";
import { AddSvg } from "@/assets/images";

const AddTeam = () => {
    const { token, api_url, phoneNumber } = useContext(StateContext)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const data = [
        {
            value: "Owner",
            name: "Owner",
        },
        {
            value: "Manager",
            name: "Manager"
        },
        {
            value: "Team Member",
            name: "Team Member",
        }
    ]
    const handleAddTeam = async () => {
        const body = `{
            "name":${name},
            "role":${role},
            "email":${email},
            "phone":${phone}
        }`
        await fetch(`${api_url}/team/${phoneNumber}`, body, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${token}`
            },
            method:'POST'
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }
    return (
        <div className="flex flex-col gap-5">
            <div className='grid grid-cols-2 gap-3 mt-5'>
                <div className='col-span-2 lg:col-span-1'>
                    <InputBox
                        value={name}
                        setValue={setName}
                        placeholder={'Enter Name'} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <SelectBox
                        data={data}
                        placeholder={'Enter Role'}
                        value={role}
                        setValue={setRole} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <InputBox
                        value={email}
                        setValue={setEmail}
                        placeholder={'Email Address'} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <InputBox
                        value={phone}
                        setValue={setPhone}
                        placeholder={'Phone Number'} />
                </div>
            </div>
            <div className="flex-end ml-auto">
                <CreateButton title="Add" onClick={handleAddTeam} size="big">
                    <AddSvg color="#FFFFFF" />
                </CreateButton>
            </div>
        </div>
    )
}

export default AddTeam;