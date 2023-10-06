import calendarSvg from '@/assets/images/calendar-outline.svg';
import SearchInput from '@/components/Input/SearchInput';
import Image from 'next/image';
import TextBase from '@/components/Text/TextBase';
import { useContext, useEffect, useState } from 'react';
import { CreateButton } from '@/components/button/CreateButton';
import CreateReminder from '@/components/popup/CreateReminder';
import LogoMark from '@/components/chat/LogoMark';
import { AddSvg, CompletedSvg, EditSvg, ReminderSvg, TrashSvg } from '@/assets/images';
import Text13 from '@/components/Text/Text13';
import AnalyticsReminder from '@/components/reminder/AnalyticsReminder';
import Text15 from '@/components/Text/Text15';
import ActionButton from '@/components/reminder/ActionButton';
import useMediaQuery from '@/components/hooks/useMedia';
import MobileAnalyticsReminder from '@/components/reminder/MobileAnalyticsReminder';
import { StateContext } from '@/context/StateContext';
import OnTimeCompletionRate from '@/components/reminder/OnTimeCompletionRate';
import ArrowRight from '@/assets/images/sidebar/arrowRight';

const ReminderPage = () => {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [id, setId] = useState("");
    const [selected, setSelected] = useState();
    const [editOpen, setEditOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [reminderTeam, setReminderTeam] = useState([]);
    const [categoryId, setCategoryID] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [teamID, setTeamID] = useState();
    const getReminderStats = async () => {
        await fetch(`${api_url}/reminders/stats/${phoneNumber}`, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'

        })
            .then((Response) => Response.json())
            .then(data => {
            }).catch(err => console.log("error:" + err));
    }
    const getReminderTeamStats = async () => {
        await fetch(`${api_url}/teams/reminders/${phoneNumber}`, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'

        })
            .then((res) => res.json())
            .then(data => {
                console.log("===========================>a")
                console.log(data);
                setReminderTeam(data.list)
            }).catch(err => console.log("error:" + err));
    }
    console.log("team teamData", teamData)

    async function handleGetTeamReminder() {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }
        await fetch(`${api_url}/reminders/${teamID}`, options)
            .then(res => res.json())
            .then(res => {
                setData(res.list)
            })
            .catch(err => console.log("error:" + err));
        return true;
    }
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
    useEffect(() => {
        async function fetchData() {
          // Fetch data here...
          try {
            await getReminder();
            await getReminderStats();
            await getReminderTeamStats();
            await handleGetTeam();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);
    // This useEffect is for when teamID changes
    // useEffect(() => {
    //     handleGetTeamReminder();
    // }, [teamID]);

    // This new useEffect is for when categoryId changes
    useEffect(() => {
        if (categoryId === phoneNumber) {
            getReminder();  // Fetches all personal reminders
        } else {
            handleGetTeamReminder();  // Fetches team-based reminders
        }
    }, [categoryId]);


    const handleSelect = (index) => {
        setSelected(index)
    }
    function CloseModal() {
        setIsOpen(false);
        setEditingItem(null);
        setIsEdit(false);
    }
    const mobile = useMediaQuery('(min-width: 1024px)');
    const handleComplete = async (item, index) => {
        console.log("handleComplete", item)
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                "date": item.date,
                "reminder": item.reminder,
                "time": item.time,
                "id": item.id,
                "teamMember": item.teamMemberName,
                "status": "completed",
            })
        }
        let fetcher = phoneNumber
        if(item.teamMemberId.length > 1){
            fetcher = item.teamId
        }
        await fetch(`${api_url}/reminders/${fetcher}`, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.success) {
                    setData(res.list);
                }
            })
            .catch(err => console.log(err))
    }
    const handleDelete = async (id) => {
        await fetch(`${api_url}/reminders/${phoneNumber}`, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
            .then(async res => {
                console.log("==========>response delete", res)
                if (res.success) {
                    await getReminder();
                }
            })
            .catch(err => console.log(err))
    }

    const handleCreate = async (data) => {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "date": data.date,
                "reminder": data.reminder,
                "time": data.time,
                "teamId": data.teamId,
                "assignedBy": data.assignedBy,
                "teamMemberId": data.teamMemberId,
                "teamMemberName": data.teamMemberName,
                "category": data.category
            })
        }
        let fetcher = phoneNumber
        if(data.teamMemberId.length > 1){
            fetcher = teamID
        }
        await fetch(`${api_url}/reminders/${fetcher}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setData(res.list)
                    CloseModal();
                }
            })
            .catch(err => console.log(err))
    }
    const handleUpdate = async (data) => {
        // Construct the payload as an object first
        const payload = {
            date: data.date,
            reminder: data.reminder,
            time: data.time,
            id: data.id,
            teamMember: data.teamMemberName,
            teamMemberId: data.teamMemberId,
            teamId: data.teamId,
        };
    
        // Set up fetch options
        const options = {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(payload),  // Convert the object to a JSON string
        };
    
        try {
            // Perform the fetch
            const res = await fetch(`${api_url}/reminders/${phoneNumber}`, options);
            const resJson = await res.json();  // Convert the response to JSON
    
            if (resJson.success) {
                setData(resJson.list);
                CloseModal();
            } else {
                console.error("API returned an error", resJson);
            }
        } catch (err) {
            console.error("An error occurred:", err);
        }
    }
    
    const handleEdit = (item, id) => {
        async function main(){
        setId(id);
        setIsOpen(true);
        setIsEdit(true)
        setEditingItem(item)
        await getReminder();
        }
        main()  
    }
    const handleSearch = async () => {
        await fetch(`${api_url}/searchReminders/${phoneNumber}`, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: `{
                "searchTerm":"${value}"
            }`
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setData(res.list);
                }
            })
            .catch(err => console.log(err))
    }
    // Inside the onChange function
    function onChange(e) {
        const { value } = e.target;
        setValue(value);
        if (value === "") {
            getReminder();
        }
    }

    // Inside the getReminder function
    const getReminder = async () => {
        let apiUrl = `${api_url}/reminders/${phoneNumber}`;
        if (categoryId) {
            apiUrl += `?category=${categoryId}`;
        }
        console.log("API URL:", apiUrl); // Debug statement

        await fetch(apiUrl, {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((Response) => Response.json())
            .then(data => {
                console.log("Response Data:", data); // Debug statement
                setData(data.list);
            })
            .catch(err => console.log("error:" + err));
    };

    const handleOpen = () => {
        setIsOpen(true);
    }
    return (
        <div className="bg-[#141414] flex flex-row lg:gap-6 2xl:gap-12 w-full rounded-lg">
            <div className='flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8'>
                <div className="flex flex-col gap-4 xl:gap-0 xl:flex-row xl:items-center justify-between w-full">
                    <div className='flex items-start gap-2.5'>
                        <LogoMark>
                            <ReminderSvg color="#0E0E0E" />
                        </LogoMark>
                        <div className='flex flex-col gap-1'>
                            <select
                                className='input-bg outline-none text-primary text-base font-semibold flex items-center'
                                value={categoryId}  // Controlled value
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setCategoryID(newValue);
                                }}
                            >
                                <option value="" disabled>Reminders</option> {/* Default option */}
                                <option value={phoneNumber}>All Personal</option>
                                {
                                    Array.isArray(teamData) && teamData.map((item, index) => (
                                        <option key={index} value={item.teamId}>{item.teamName}</option>
                                    ))
                                }
                            </select>
                            <span className="w-5 h-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 rotate-90">
                                <ArrowRight color="#86878A" />
                            </span>
                            <Text13 color="primary"
                                title="Manage your reminers with simplify!" />
                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <SearchInput
                            className={"relative bg-[#191919] flex items-center rounded-lg h-9 flex-1 2xl:w-[387px]"}
                            value={value}
                            onChange={onChange}
                            onClick={handleSearch}
                            placeholder={"Search Reminder"} />
                        <CreateButton title={mobile ? "New Reminder" : "New"} onClick={handleOpen}>
                            <AddSvg color="#FFFFFF" />
                        </CreateButton>
                    </div>
                    <MobileAnalyticsReminder data={data} />
                </div>
                <div className="flex flex-col w-full">
                    <div className='w-full grid grid-cols-5 items-center bg-gray-1100 px-4 rounded-lg py-2.5'>
                        <div className='flex lg:col-span-1'>
                            <Text13 color="primary" title="Reminder" />
                        </div>
                        <div className='col-span-1'>
                            <div className='hidden lg:flex'>
                                <Text13 color="primary" title="Date of Reminder" />
                            </div>
                            <div className='flex lg:hidden'>
                                <Text13 color="primary" title="Date" />
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='hidden lg:flex'>
                                <Text13 color="primary" title="Time of Reminder" />
                            </div>
                            <div className='flex lg:hidden'>
                                <Text13 color="primary" title="Time" />
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='hidden lg:flex'>
                                <Text13 color="primary" title="Team Member" />
                            </div>
                            <div className='flex lg:hidden'>
                                <Text13 color="primary" title="Member" />
                            </div>
                        </div>
                        <div className='col-span-1 ml-auto'>
                            <div className='hidden lg:flex'>
                                <Text13 color="primary" title="Actions" />
                            </div>
                        </div>

                    </div>
                    <div className='h-full max-h-[640px] min-h-[640px] flex flex-col divide-y-[1px] divide-[#343434]  overflow-y-auto w-full overscroll lg:scrollbar'>
    {
        data.length > 0 && data.map((item, index) => (
            item.status !== "completed" && (categoryId === phoneNumber || item.teamId === categoryId) ? (
            <div
                    className={`w-full grid grid-cols-5 gap-2 lg:gap-0 items-center py-2 px-3 xl:px-0 cursor-pointer ${selected === index ? "" : ""}`}
                    onClick={() => handleSelect(index)}
                    key={index}>
                    <div className='flex col-span-1'>
                        <Text15 title={mobile ? item.reminder : item.reminder} color="white" />
                    </div>
                    <div className='flex col-span-1'>
                        <Text15 title={mobile ? item.date : item.date} color="primary" />
                    </div>
                    <div className='flex xl:hidden col-span-1'>
                        <Text15 title={"4:12 PM"} color="primary" />
                    </div>
                    <div className='hidden xl:flex items-center gap-0.5 col-span-1 text-[#7177EC]'>
                        <Text15 title={item.time} color="[#7177EC]" />
                        <Text15 title="PM EST" color="white" />
                    </div>
                    <div className='flex col-span-1'>
                        <Text15 title={item.teamMemberName} color="white" />
                    </div>
                    <div className='col-span-1 flex items-center ml-auto gap-1 xl:gap-2'>
                        <ActionButton background="gray-1100" onClick={() => handleComplete(item,index)}>
                            <CompletedSvg />
                        </ActionButton>
                        <ActionButton background="gray-1100" onClick={() => handleDelete(item.id)}>
                            <TrashSvg />
                        </ActionButton>
                        <ActionButton background="gray-1100" onClick={() => handleEdit(item, index)}>
                            <EditSvg />
                        </ActionButton>
                    </div>
                </div>
            ) : null // <-- Conditional rendering ends here
        ))
    }
</div>

                </div>
            </div>
            <div className='hidden xl:block lg:flex flex-col gap-[15px] flex-1'>
                <AnalyticsReminder data={data} setData={setData} />
            </div>
            {isOpen && <CreateReminder
                isOpen={isOpen}
                closeModal={CloseModal}
                title={isEdit ? "Edit Reminer" : "Create a Reminder"}
                category="reminder"
                initialValues={editingItem || { date: '', reminder: '', teamMemberName: '', time: '', teamMemberId: '' }}
                onClick={isEdit ? handleUpdate : handleCreate}
            />}
        </div>
    )
}

export default ReminderPage;
