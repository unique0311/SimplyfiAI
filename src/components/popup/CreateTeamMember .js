import { useContext, useEffect, useState } from "react";
import Modal from "./index"
import { CreateButton } from "../button/CreateButton";
import { AddSvg } from "@/assets/images";
import ArrowRight from "@/assets/images/sidebar/arrowRight";
const CreateTeamMember = ({ isOpen, closeModal, title, initialValues,onClick }) => {
    const [formData, setFormData] = useState(initialValues);
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
    useEffect(()=>{
        setFormData(initialValues);
    },[initialValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        onClick(formData);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={title}>
            <div className="flex flex-col gap-5">
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <div className='col-span-2 lg:col-span-1'>
                        <input
                            type="text"
                            name="name"
                            placeholder={'Enter Name'}
                            value={formData.name}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-2  rounded-3xs text-sm font-inter font-medium text-primary  w-full outline-none"
                            onChange={handleChange} />
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className="relative">
                            <select
                                name="role"
                                className="input-bg border-px border-[#2B2B2B]  flex items-center py-3 px-4 rounded-lg text-sm leading-[17px] font-inter text-primary truncate placeholder:text-primary font-medium  outline-none w-full appearance-none"
                                value={formData.role} onChange={handleChange}>
                                <option value="default">Enter Role</option>
                                {
                                    data.map((item, index) => (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <span className="w-5 h-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 rotate-90">
                                <ArrowRight color="#86878A" />
                            </span>
                        </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <input
                            type="text"
                            name="email"
                            placeholder={'Email Address'}
                            value={formData.email}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-2  rounded-3xs text-sm font-inter font-medium text-primary  w-full outline-none"
                            onChange={handleChange} />
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <input
                            
                            name="phoneNumber"
                            placeholder={'Phone Number'}
                            value={formData.phoneNumber}
                            className="input-bg border-px border-[#2B2B2B] flex items-center px-4 py-2  rounded-3xs text-sm font-inter font-medium text-primary  w-full outline-none"
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="flex-end ml-auto">
                    <CreateButton title={title==="Edit Team Member"?"Update":"Add"} onClick={handleSubmit} size="big">
                        <AddSvg color="#FFFFFF" />
                    </CreateButton>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTeamMember;