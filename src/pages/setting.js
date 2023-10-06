import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import LogoMark from '@/components/chat/LogoMark';
import Text13 from '@/components/Text/Text13';
import { AddSvg, EditSvg, SettingSvg, TeamSvg, TrashSvg } from '@/assets/images';
import ItemsBox from '@/components/setting/ItemsBox';
import ItemsBoxHeader from '@/components/setting/ItemsBoxHeader';
import AddTeam from '@/components/setting/AddTeam';
import Text15 from '@/components/Text/Text15';
import ActionButton from '@/components/reminder/ActionButton';
import EditProfile from '@/components/setting/EditProfile';
import ManageSubscription from '@/components/setting/ManageSubscription';
import { StateContext } from '@/context/StateContext';
import user from "../assets/images/team-user.png"
import axios from 'axios';
import { CreateButton } from '@/components/button/CreateButton';
import CreateTeam from '@/components/popup/CreateTeam';
import CreateTeamMember from '@/components/popup/CreateTeamMember ';
import SelectBox from '@/components/Input/SelectBox';
import ArrowRight from '@/assets/images/sidebar/arrowRight';
const SettingPage = () => {
    const { api_url, phoneNumber, token } = useContext(StateContext);
    const [addTeamOpen, setAddTeamOpen] = useState(false);
    const [TeamOpen, setTeamOpen] = useState(false);
    const [profileData, setProfileData] = useState();
    const [teamData, setTeamData] = useState([]);
    const [teamID, setTeamID] = useState();
    const initial_Data = {
        name: "",
        role: "",
        email: "",
        phone: ""
    }
    const [editingItem, setEditingItem] = useState(initial_Data);
    const [isEdit, setIsEdit] = useState(false);
    async function handleGetTeam() {
        let options = {
            headers: {
                authorization: `token ${token}`
            },
            method: 'GET'
        }
        await fetch(`${api_url}/team/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setTeamData(res.list);
                    setTeamID(res.list[0].teamId)
                }
            })
            .catch(err => console.log("error:" + err));
        return true;
    }
    async function handleGetTeamMember() {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }
        await fetch(`${api_url}/team/members/${phoneNumber}/${teamID}`, options)
            .then(res => res.json())
            .then(res => {
                setProfileData(res.members)
            })
            .catch(err => console.log("error:" + err));
        return true;
    }
    useEffect(() => {
        handleGetTeamMember();
    }, [teamID, TeamOpen, addTeamOpen]);
    useEffect(() => {
        handleGetTeam();
    }, [])
    const handleTeamDelete = async (id) => {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: `{
                "teamId":"${teamID}",
                "memberId":"${id}"
            }`
        }
        await fetch(`${api_url}/team/members/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    handleGetTeam();
                    handleGetTeamMember()
                };

            })
            .catch(err => console.log("error:" + err))
    }
    const handleTeamUpdate = async (item) => {
        setIsEdit(true);
        setAddTeamOpen(true);
        setEditingItem(item);
    }
    const closeModal = () => {
        setAddTeamOpen(false)
    }
    const handleUpdates = async (data) => {
        const { id, name, role } = data;
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                teamId: teamID,
                memberId: id,
                name: name,
                role: role,
            }),
        }
        await fetch(`${api_url}/team/members/${phoneNumber}`, options)
            .then(res => res.json())
            .then(async res => {
                if (res.success) {
                    await handleGetTeamMember();
                    closeModal();
                    setEditingItem({
                        name: "",
                        role: "",
                        email: "",
                        phone: ""
                    })
                }

            })
            .catch(err => console.log("error:" + err))
    }
    const handleCreate = async (data) => {
        let options = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${token}`
            },
            method: 'POST',
            body: `{
                "teamId":"${teamID}",
                "name":"${data.name}",
                "role":"${data.role}",
                "email":"${data.email}",
                "phone":"${data.phone}"
            }`
        }
        await fetch(`${api_url}/team/members/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    closeModal();
                    setEditingItem({
                        name: "",
                        role: "",
                        email: "",
                        phone: ""
                    })
                }
            })
    }
    const handleAdd = () => {
        setAddTeamOpen(true);
        setIsEdit(false)
    }

    return (
        <div className="bg-[#141414] flex flex-col lg:flex-row lg:gap-6 2xl:gap-12 w-full rounded-lg h-full">
            <div className='flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8  h-full'>
                <div className='flex items-start gap-2.5'>
                    <LogoMark>
                        <SettingSvg color="#0E0E0E" />
                    </LogoMark>
                    <div className='flex flex-col gap-1'>
                        <span className='text-white font-inter font-semibold text-[15px] leading-[18px]'>
                            Settings
                        </span>
                        <Text13 color="primary"
                            title="Manage your reminers with simplify!" />
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-3 2xl:gap-6'>
                    <div className='flex flex-col gap-[18px] col-span-2 lg:col-span-1 h-full'>
                        <EditProfile />
                    </div>
                    <ItemsBox>
                        <div className='flex flex-col gap-2 lg:gap-0 lg:flex-row items-center justify-between w-full'>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-[9px]">
                                    <LogoMark size="small">
                                        <TeamSvg />
                                    </LogoMark>
                                    <select
                                        className='input-bg outline-none text-primary text-base font-semibold flex items-center'
                                        value={teamID}
                                        onChange={(e) => setTeamID(e.target.value)}>
                                        {
                                            Array.isArray(teamData) && teamData.map((item, index) => (
                                                <option key={index} value={item.teamId}>{item.teamName}</option>
                                            ))
                                        }

                                    </select>
                                    <span className="w-5 h-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 rotate-90">
                                        <ArrowRight color="#86878A" />
                                    </span>
                                </div>

                            </div>
                            <div className='flex flex-col items-start lg:flex-row lg:items-center gap-2.5 w-full'>
                                <CreateButton title="Add Team Member" onClick={handleAdd} size="large">
                                    <AddSvg color="#FFFFFF" />
                                </CreateButton>
                                <CreateButton title="New Team" onClick={() => setTeamOpen(true)} size="big">
                                    <AddSvg color="#FFFFFF" />
                                </CreateButton>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='bg-[#191919] rounded-lg grid grid-cols-3 items-center py-2.5 px-4'>
                                <div className='col-span-1 flex items-center'>
                                    <Text13 color="primary" title="Name" />
                                </div>
                                <div className='col-span-1 flex items-center'>
                                    <Text13 color="primary" title="Role" />
                                </div>
                                <div className='col-span-1'></div>
                            </div>
                            <div className='h-full min-h-[500px] flex flex-col divide-y-[1px] divide-[#343434]  overflow-y-auto w-full overscroll lg:scrollbar'>
                                {
                                    Array.isArray(profileData) ? profileData.length > 0 && profileData.map((item, index) => (
                                        <div className='grid grid-cols-3 items-center w-full py-2' key={index}>
                                            <div className='col-span-1 flex items-center gap-2.5'>
                                                <Image alt="user" src={user} className='w-7 h-7 rounded-full' />
                                                <Text15 color="white" title={item.name} />
                                            </div>
                                            <div className='col-span-1 flex items-center'>
                                                <Text15 color="primary" title={item.role} />
                                            </div>
                                            <div className='col-span-1 ml-auto flex items-center gap-2'>
                                                <ActionButton background="gray-1100" onClick={() => handleTeamDelete(item.id)}>
                                                    <TrashSvg />
                                                </ActionButton>
                                                <ActionButton background="gray-1100" onClick={() => handleTeamUpdate(item)}>
                                                    <EditSvg />
                                                </ActionButton>

                                            </div>
                                        </div>
                                    )) : null
                                }
                            </div>
                        </div>
                    </ItemsBox>
                </div>
            </div>
            <div className='flex-1'>
                <ManageSubscription page="setting" />
            </div>
            <CreateTeam
                isOpen={TeamOpen}
                closeModal={() => setTeamOpen(false)}
                onClick={handleGetTeam}
                title="Create Team" />
            <CreateTeamMember
                isOpen={addTeamOpen}
                initialValues={editingItem}
                closeModal={closeModal}
                onClick={isEdit ? handleUpdates : handleCreate}
                title={isEdit ? "Edit Team Member" : "Add Team Member"} />
        </div>
    )
}

export default SettingPage;