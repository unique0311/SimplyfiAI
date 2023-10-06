import { CreateButton } from "@/components/button/CreateButton";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import sendIcon from "@/assets/images/send.png";
import ALIcon from "@/assets/images/Al-icon.png";
import LatestChat from "@/components/chat/LatestChat";
import Text13 from "@/components/Text/Text13";
import LogoMark from "@/components/chat/LogoMark";
import { ChatSvg, CheckIconSvg, BotIcon } from "@/assets/images";
import { StateContext } from "@/context/StateContext";
export default function Home() {
  const { token, api_url, phoneNumber } = useContext(StateContext);
  const [value, setValue] = useState("");
  const [userMessageList, setUserMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const chatContainerRef = useRef(null);

  useEffect(() => {
    async function fetchResponse() {
      const lastMessage = userMessageList[userMessageList.length - 1];
      const userMessage = lastMessage.message;

      if (userMessage.trim() !== "") {
        // Add a placeholder message with loading dots
        setUserMessageList((prev) => [
          ...prev,
          { type: "ai", message: "..." }, // Placeholder
        ]);

        // Fetch AI response based on user message
        await fetch(`${api_url}/text`, {
          headers: {
            authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            message: userMessage,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const aiResponse = data.message;

            if (aiResponse !== "") {
              // Replace the placeholder with the actual AI response
              setUserMessageList((prev) =>
                prev.map((message) =>
                  message.message === "..."
                    ? { ...message, message: aiResponse }
                    : message
                )
              );
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      }
    }

    if (userMessageList.length > 0) {
      const lastMessage = userMessageList[userMessageList.length - 1];
      if (lastMessage.type === "user" && lastMessage.message.trim() !== "") {
        fetchResponse();
      }
    }
  }, [userMessageList, api_url, token]);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [userMessageList]);

  function isLastMessage(index) {
    return index === userMessageList.length - 1;
  }

  const textareaRef = useRef(null);

  const resizeTextArea = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleSendMessage = async () => {
    if (value.trim() !== "") {
      setUserMessageList((prev) => [...prev, { type: "user", message: value }]);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      // await handleGetTeamReminder();
      // Now you can set other states or perform additional actions
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#141414] flex flex-row gap-12 w-full rounded-lg flex-grow">
      <div className="flex flex-col gap-4 w-full pt-5 lg:pt-6 pb-7 px-[26px] lg:pr-0 lg:pl-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-start gap-2.5">
            <LogoMark>
              <ChatSvg color="#000000" />
            </LogoMark>
            <div className="flex flex-col gap-1">
              <span className="text-white font-inter font-semibold text-[15px] leading-[18px]">
                Chat with SimplifyAI
              </span>
              <Text13 color="primary" title="Ask me any question!" />
            </div>
            <div className="bg-[#535353] bg-opacity-20 rounded-md flex items-center justify-center px-[5px] py-1">
              <span className="text-primary text-[11px] leading-[11px] font-inter font-semibold">
                Open for 4h
              </span>
            </div>
          </div>
          <div className="rounded-full hidden lg:flex items-center gap-6 justify-between px-2 py-[3.5px] bg-mediumseagreen">
            <span className="font-inter font-semibold text-forestgreen text-xs leading-[15px]">
              Online
            </span>
            <span className=" bg-forestgreen rounded-full w-1.5 h-1.5 flex"></span>
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-grow">
          <div
            ref={chatContainerRef}
            className="border-px border-gray-700 h-full min-h-[355px] max-h-[606px] rounded-3xs overscroll overflow-y-auto flex-grow"
            style={{ minHeight: "calc(100vh - 355px)" }}
          >
            {userMessageList.map((message, index) => (
              <div
                key={index}
                className={`flex justify-${
                  message.type === "user" ? "end" : "start"
                }`}
              >
                <div className="grid grid-cols-1 px-7 py-10" key={index}>
                  <div className="col-span-1 flex flex-col gap-30 mr-auto">
                    {message.type === "ai" && (
                      <div
                        className={`flex items-end gap-2 ${
                          isLoading ? "text-white" : ""
                        }`}
                      >
                        <div className="flex items-center justify-end rounded-full bg-gray-1000 relative w-[38px] h-[38px]">
                          <Image alt="icon" src={ALIcon} />
                          <span className="absolute right-0 top-1 bg-forestgreen w-1.5 h-1.5 flex rounded-full flex-1"></span>
                        </div>
                        {isLoading && isLastMessage(index) ? (
                          <span className="bubble-loading">...</span>
                        ) : (
                          message.message !== "..." && (
                            <div className="bg-gray-500 rounded-lg rounded-bl-0 py-2 px-4 text-sm text-white text-opacity-70 font-inter font-medium leading-5 flex-1">
                              {message.message}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-span-1 flex flex-col gap-30 ml-auto mt-10">
                    {message.type === "user" && (
                      <div className="flex items-end gap-2">
                        <div className="send-bg rounded-lg rounded-bl-0 py-2 px-4 text-sm text-white text-opacity-80 font-inter font-medium leading-5 flex-1">
                          {message.message}
                        </div>
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-lavender">
                          <CheckIconSvg />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex items-center border-px border-[#0000000D] send-input-bg rounded-lg"
            style={{ zIndex: 3 }}
          >
            <div
              className="py-3.5 px-3 hidden lg:flex items-center justify-center text-plum text-sm leading-4 font-inter font-medium bg-purple-400 bg-opacity-20"
              style={{ zIndex: 4 }}
            >
              CHAT
            </div>
            <div
              className="flex items-center justify-between w-full pr-2.5 py-1.5 relative"
              style={{ minHeight: "40px", zIndex: 1 }}
            >
              {" "}
              {/* Lower z-index so that CHAT and Send buttons can overlay */}
              <textarea
                ref={textareaRef}
                placeholder={""}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  resizeTextArea(e.target);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="absolute inset-0 w-full h-full pr-12 resize-none flex items-center focus:outline-none" // Added flex and items-center
                style={{
                  zIndex: 0,
                  backgroundColor: "#202020",
                  color: "white",
                }}
                rows="1"
              ></textarea>
              <div
                className="absolute right-0 top-0 bottom-0 flex items-center"
                style={{ zIndex: 2 }}
              >
                {" "}
                {/* Higher z-index than textarea */}
                <CreateButton title="Send" onClick={() => handleSendMessage()}>
                  <Image alt="send-icon" src={sendIcon} />
                </CreateButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block flex-1">
        <LatestChat />
      </div>
    </div>
  );
}
