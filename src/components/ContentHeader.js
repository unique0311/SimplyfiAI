import Image from "next/image";
import SearchInput from "./Input/SearchInput";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "@/context/StateContext";
const ContentHeader = () => {
  const { api_url, phoneNumber, token } = useContext(StateContext);
  const [profileData, setProfileData] = useState([]);
  const [value, setValue] = useState("");
  console.log(phoneNumber);
  async function handleGetTeam() {
    let options = {
      headers: {
        authorization: `token ${token}`,
      },
      method: "GET",
    };
    await fetch(`${api_url}/profile/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        setProfileData(res.profile);
      })
      .catch((err) => console.log("error:" + err));
    return true;
  }

  useEffect(() => {
    handleGetTeam();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="hidden lg:flex items-center justify-between px-9 py-[25px] rounded-xl w-full">
        <SearchInput
          className={
            "relative bg-[#191919] flex items-center rounded-lg h-9 w-[503px]"
          }
          value={value}
          setValue={setValue}
          placeholder={"Search Site"}
          text="URL"
        />
        <div className="flex items-center">
          <div className="text-sm leading-[17px] font-inter font-medium text-primary inline-block bg-[#191919] rounded-l-lg rounded-r-none py-2.5 px-3">
            Welcome,{" "}
            <span className="font-semibold text-white">
              {profileData?.name}!
            </span>
          </div>
          <div className="w-9 h-9 rounded-r-lg overflow-hidden">
            {profileData?.image ? (
              <img
                alt="simplify-user"
                src={profileData?.image}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                alt="simplify-user"
                src={
                  "https://media.discordapp.net/attachments/1107681683974660117/1144704918767292616/Recordings_City_rainbow_hue_logo_but_the_city_is_on_a_white_bac_218684c6-5652-4984-abf8-f73b5f1a28e8.png"
                }
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full inline-block border-b-[1px] border-solid border-black-primary"></div>
    </div>
  );
};

export default ContentHeader;
