import { useContext, useEffect, useState } from "react";
import InputBox from "../Input/GeneralInput";
import { CreateButton } from "../button/CreateButton";
import ItemsBox from "./ItemsBox";
import ItemsBoxHeader from "./ItemsBoxHeader";
import SelectBox from "../Input/SelectBox";
import { StateContext } from "@/context/StateContext";
import axios from "axios";
import EditInputBox from "../Input/EditInptBox";

const EditProfile = () => {
    const { api_url, phoneNumber, token } = useContext(StateContext);
    const [edit_data, setEditData] = useState({
        name: "",
        address: "",
        timezone: "",
        phone: "",
        email: "",
        image:""
    })
    const [profile, setProfileData] = useState([]);
    const data = [
        { value: "-12:00", name: "(GMT -12:00) Eniwetok, Kwajalein" },
        { value: "-11:00", name: "(GMT -11:00) Midway Island, Samoa" },
        { value: "-10:00", name: "(GMT -10:00) Hawaii" },
        { value: "-09:50", name: "(GMT -9:30) Taiohae" },
        { value: "-09:00", name: "(GMT -9:00) Alaska" },
        { value: "-08:00", name: "(GMT -8:00) Pacific Time (US & Canada)" },
        { value: "-07:00", name: "(GMT -7:00) Mountain Time (US & Canada)" },
        { value: "-06:00", name: "(GMT -6:00) Central Time (US & Canada), Mexico City" },
        { value: "-05:00", name: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima" },
        { value: "-04:50", name: "(GMT -4:30) Caracas" },
        { value: "-04:00", name: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz" },
        { value: "-03:50", name: "(GMT -3:30) Newfoundland" },
        { value: "-03:00", name: "(GMT -3:00) Brazil, Buenos Aires, Georgetown" },
        { value: "-02:00", name: "(GMT -2:00) Mid-Atlantic" },
        { value: "-01:00", name: "(GMT -1:00) Azores, Cape Verde Islands" },
        { value: "+00:00", name: "(GMT) Western Europe Time, London, Lisbon, Casablanca", selected: true },
        { value: "+01:00", name: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris" },
        { value: "+02:00", name: "(GMT +2:00) Kaliningrad, South Africa" },
        { value: "+03:00", name: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg" },
        { value: "+03:50", name: "(GMT +3:30) Tehran" },
        { value: "+04:00", name: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
        { value: "+04:50", name: "(GMT +4:30) Kabul" },
        { value: "+05:00", name: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent" },
        { value: "+05:50", name: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi" },
        { value: "+05:75", name: "(GMT +5:45) Kathmandu, Pokhara" },
        { value: "+06:00", name: "(GMT +6:00) Almaty, Dhaka, Colombo" },
        { value: "+06:50", name: "(GMT +6:30) Yangon, Mandalay" },
        { value: "+07:00", name: "(GMT +7:00) Bangkok, Hanoi, Jakarta" },
        { value: "+08:00", name: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong" },
        { value: "+08:75", name: "(GMT +8:45) Eucla" },
        { value: "+09:00", name: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk" },
        { value: "+09:50", name: "(GMT +9:30) Adelaide, Darwin" },
        { value: "+10:00", name: "(GMT +10:00) Eastern Australia, Guam, Vladivostok" },
        { value: "+10:50", name: "(GMT +10:30) Lord Howe Island" },
        { value: "+11:00", name: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia" },
        { value: "+11:50", name: "(GMT +11:30) Norfolk Island" },
        { value: "+12:00", name: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka" },
        { value: "+12:75", name: "(GMT +12:45) Chatham Islands" },
        { value: "+13:00", name: "(GMT +13:00) Apia, Nukualofa" },
        { value: "+14:00", name: "(GMT +14:00) Line Islands, Tokelau" },
    ];
    for (let i = 0; i < data.length; i++) {
        data[i].value = data[i].name;
    }
    async function handleGetTeam() {
        let options = {
            headers: {
                authorization: `token ${token}`,
            },
            method: 'GET',
        }
        await fetch(`${api_url}/profile/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {
                setEditData((prev) => ({
                    ...prev,
                    name: res.profile.name,
                    address: res.profile.address,
                    timezone: res.profile.timeZone,
                    phone: phoneNumber,
                    email: res.profile.email,
                    image:res.profile.image

                }))
                setProfileData(res.profile)
            })
            .catch(err => console.log("error:" + err));
        return true;
    }
    useEffect(() => {
        handleGetTeam()
    }, [])
    const handleSaveProfile = async () => {
        await fetch(`${api_url}/profile/${phoneNumber}`, {
            method: "POST",
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: edit_data.name,
                email: edit_data.email,
                address: edit_data.address,
                phoneNumber: phoneNumber,
                timeZone: edit_data.timezone,
                image: edit_data.image
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    handleGetTeam();
                }
            })
            .catch(error => console.log(error))
    }
    const handleOnChange = (field, value) => {
        setEditData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }
    return (
        <ItemsBox>
            <ItemsBoxHeader title="Edit Profile">
                <CreateButton title="Save" onClick={() => handleSaveProfile()} />
            </ItemsBoxHeader>
            <div className='grid grid-cols-2 gap-3'>
                <div className='col-span-2 lg:col-span-1'>
                    <EditInputBox
                        name="name"
                        value={edit_data.name}
                        handleChange={handleOnChange}
                        placeholder={'Edit Name'} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <EditInputBox
                        name="email"
                        value={edit_data.email}
                        handleChange={handleOnChange}
                        placeholder={'Email Address'} />
                </div>
                <div className='col-span-2 block w-full'>
                    <SelectBox
                        value={edit_data.timezone}
                        setValue={(item) => handleOnChange("timezone", item)}
                        placeholder="Time Zone"
                        data={data} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <EditInputBox
                        name="email"
                        value={edit_data.phone}
                        handleChange={handleOnChange}
                        placeholder={'Phone Number'} />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <EditInputBox
                        name="address"
                        value={edit_data.address}
                        handleChange={handleOnChange}
                        placeholder={'Address'} />

                </div>

            </div>
            <EditInputBox
                name="image"
                value={edit_data.image}
                handleChange={handleOnChange}
                placeholder={'Image Url'} />
        </ItemsBox>
    )
}

export default EditProfile;