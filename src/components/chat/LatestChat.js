import { useContext, useEffect, useState } from "react";
import SearchInput from "../Input/SearchInput";
import Text13 from "../Text/Text13";
import LogoMark from "./LogoMark";
import sound from "@/assets/images/sound.png";
import Image from "next/image";
import ArrowRight from "@/assets/images/sidebar/arrowRight";
import { GrayButton } from "../button/CreateButton";
import { StateContext } from "@/context/StateContext";
const LatestChat = () => {
  const { token, api_url, phoneNumber } = useContext(StateContext);
  const [chatData, setChatData] = useState([]);
  const [value, setValue] = useState("");
  const handleLatestMessage = async () => {
    await fetch(`${api_url}/previousmessage/${phoneNumber}`, {
      headers: {
        authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setChatData(res.messages);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
  useEffect(() => {
    handleLatestMessage();
  }, []);
  const handleExport = () => {
    console.log("fsdfsd");
  };
  return (
    <div
      className="py-5 px-6 flex flex-col gap-4 w-[330px] rounded-r-lg h-full"
      style={{ background: "linear-gradient(0deg, #222222, #222222), #E0DCF9" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-white font-inter font-semibold leading-[18px] text-mini">
          Latest Chats
        </span>
        <GrayButton size="big" title="Export" onClick={handleExport} />
      </div>
      <div className="flex flex-col gap-5">
        <SearchInput
          className={
            "relative bg-darkslategray-200 flex items-center rounded-lg h-9"
          }
          value={value}
          setValue={setValue}
          placeholder={"Search Chat"}
          text="Chat"
        />
        <div className="flex flex-col gap-2 h-full max-h-[499px] 2xl:max-h-[650px] divide-y-[1px] divide-[#343434] overflow-y-scroll overscroll">
          {Array.isArray(chatData) &&
            chatData.map((item, index) => (
              <div className="flex flex-col gap-2.5 py-2" key={index}>
                <Text13 title={item.fromphone} color="white" />
                <div className="flex items-center gap-3.5">
                  <LogoMark>
                    <Image src={sound} alt="sound-icon" />
                  </LogoMark>
                  <div className="flex items-end flex-1 justify-between">
                    <Text13 color="primary" title={item.message} />
                    <ArrowRight color="#86878A" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LatestChat;
