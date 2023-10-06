import { useContext, useEffect, useState } from "react";
import { CreateButton } from "../button/CreateButton";
import Modal from "./index"
import ArrowRight from "@/assets/images/sidebar/arrowRight";
import { NotificationContext, NotificationType } from "@/context/NotificationContext";
import { StateContext } from "@/context/StateContext";
const CreateReminder = ({ isOpen, closeModal, title, category,onClick,initialValues }) => {
    const [formData, setFormData] = useState(initialValues);
    const {sendPromiseNotification} = useContext(NotificationContext);
    const {api_url,phoneNumber,token} = useContext(StateContext);
    const [data, setData] = useState([]);
    const getTeam =async()=>{
        await fetch(`${api_url}/team/${phoneNumber}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                authorization: `token ${token}`

            }
        })
        .then(res=>res.json())
        .then(async(data)=>{
            if(data.success){
                await fetch(`${api_url}/team/members/${phoneNumber}/${data.list[0].teamId}`,{
                    method:"GET",
                    headers:{
                        'Content-Type': 'application/json',
                        authorization: `token ${token}`
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    setData(data.members)
                })
            }
        })
    };
    useEffect(()=>{
        getTeam()
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onClick(formData);
        sendPromiseNotification(
            NotificationType.SUCCESS,
            'Reminder is created successfully',
            'success'
        )
        closeModal()
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        const selectedOption = data.find((item) => item.name === selectedValue);
        setFormData({
            ...formData,
            teamMemberName: selectedValue,
            teamMemberId: selectedOption ? selectedOption.id : '', // Update teamMemberId
          });
    };
    console.log(formData)
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title} category={category}>
            <div className="flex flex-col gap-3 mt-8">
                <textarea
                    value={formData.reminder}
                    name="reminder"
                    onChange={handleChange}
                    className="input-bg border-px border-[#2B2B2B] w-full px-4 pt-3 h-[131px] rounded-3xs text-sm font-inter font-medium text-primary outline-none"
                    placeholder="Type a reminder"></textarea>
                <div className="w-full flex items-center gap-3">
                    <div className="w-1/2">
                        <input
                            type="date"
                            name="date"
                            placeholder="04/08/2023"
                            value={formData.date}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-2  rounded-3xs text-sm font-inter font-medium text-primary  w-full outline-none h-[49px]"
                            onChange={handleChange} />
                    </div>
                    <div className="w-1/2">
                        <input
                            type="time"
                            name="time"
                            placeholder="05:16 PM "
                            value={formData.time}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-2 rounded-3xs text-sm font-inter font-medium text-primary w-full outline-none h-[49px]"
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="relative">
                    <select 
                        name="teamMemberName"
                        className="input-bg border-px border-[#2B2B2B]  flex items-center py-3 px-4 rounded-lg text-sm leading-[17px] font-inter text-primary truncate placeholder:text-primary font-medium  outline-none w-full appearance-none"
                        value={formData.teamMemberName} onChange={handleSelectChange}>
                        <option value="default">Select Team Member</option>
                        {
                            Array.isArray(data)?data.map((item, index) => (
                                <option value={item.value} key={index}>{item.name}</option>
                            )):null
                        }
                    </select>
                    <span className="w-5 h-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 rotate-90">
                        <ArrowRight color="#86878A" />
                    </span>
                 </div>
                <div className="flex-end ml-auto">
                    <CreateButton title="Create" onClick={handleSubmit} />
                </div>
            </div>

        </Modal>
    )
}

export default CreateReminder;