import { AddSvg, ChatSvg, ReminderSvg } from "@/assets/images";
import ArrowRight from "@/assets/images/sidebar/arrowRight";
import ActiveReminderLayout from "@/components/ActiveReminderLayout";
import SearchInput from "@/components/Input/SearchInput";
import Text13 from "@/components/Text/Text13";
import Text15 from "@/components/Text/Text15";
import { CreateButton, GrayButton } from "@/components/button/CreateButton";
import LogoMark from "@/components/chat/LogoMark";
import EmailPreview from "@/components/email/EmailPreview";
import SetUpEmail from "@/components/popup/SetUpEmail";
import { StateContext } from "@/context/StateContext";
import { useContext, useEffect, useState } from "react";

const EmailsPage = () => {
  const { api_url, phoneNumber, token } = useContext(StateContext);
  const [data, setData] = useState([]);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [debriefingData, setDebreifingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [readContent, setReadContent] = useState();
  const [time, setTime] = useState("");
  const getEmailBreif = async () => {
    await fetch(`${api_url}/emails/${phoneNumber}?index=0`, {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((Response) => Response.json())
      .then((response) => {
        if (response.success) {
          setLoading(false);
          setData(response.list.emails);
        }
      })
      .catch((err) => console.log("error:" + err));
    return true;
  };
  const getBreifSetting = async () => {
    await fetch(`${api_url}/debriefingsetting/${phoneNumber}`, {
      headers: {
        authorization: `token ${token}`,
      },
      method: "GET",
    })
      .then((Response) => Response.json())
      .then((response) => {
        console.log(response, "setDebreifingData");
        if (response.success) {
          setDebreifingData(response.result);
        }
      })
      .catch((err) => console.log("error:" + err));
    return true;
  };
  useEffect(() => {
    setLoading(true);
    getEmailBreif();
    // setTime(convertTo12HourFormat(debriefingData.time));
  }, []);
  useEffect(() => {
    getBreifSetting();
  }, [isCreate]);
  function convertTo12HourFormat(time24Hour) {
    const [hours, minutes] = time24Hour.split(":");

    let period = "AM";
    let hour = parseInt(hours, 10);

    if (hour === 0) {
      hour = 12;
    } else if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }

    return `${hour}:${minutes}${period}`;
  }
  const handleFilter = () => {
    console.log("");
  };
  const handleSearch = () => {};
  function onChange(e) {
    const { value } = e.target;
    setValue(value);
    if (value === "") {
      getEmailBreif();
    }
  }
  const isMobile = window.innerWidth <= 768;
  function handleRead(item) {
    setReadContent(item);
    if (isMobile) {
      setShowEmailPreview(true);
    }
  }
  const onClick = () => {
    if (isMobile) {
      setShowEmailPreview(false);
    }
  };
  const time12Hour = debriefingData.time
    ? convertTo12HourFormat(debriefingData.time)
    : "";
  return (
    <div className="bg-[#141414] flex flex-row gap-6 2xl:gap-12 w-full rounded-lg">
      {!showEmailPreview && (
        <div className="flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8 ">
          <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center justify-between w-full">
            <div className="flex items-start gap-2.5">
              <LogoMark>
                <ChatSvg color="#141414" />
              </LogoMark>
              <div className="flex flex-col gap-1">
                <span className="text-white font-inter font-semibold text-[15px] leading-[18px]">
                  Your Debriefings
                </span>
                <Text13
                  color="primary"
                  title="Manage your reminers with simplify!"
                />
              </div>
            </div>
            <div className="flex xl:hidden">
              <ActiveReminderLayout>
                <div className="flex items-center gap-3">
                  <LogoMark>
                    <ReminderSvg color="black" />
                  </LogoMark>
                  <div className="flex flex-col">
                    <Text15 title="Emails Today" color="white" />
                    <Text15 title={data.length} color="white" />
                  </div>
                </div>
              </ActiveReminderLayout>
            </div>
            <div className="flex items-center gap-2">
              <SearchInput
                className={
                  "relative hidden bg-[#191919] xl:flex items-center rounded-lg h-9 2xl:w-[387px]"
                }
                value={value}
                onChange={onChange}
                onClick={handleSearch}
                placeholder={"Search Email"}
              />
              <GrayButton size="xs" title="Sort" onClick={handleFilter} />
              <CreateButton
                title="Setup"
                onClick={() => setIsCreate(true)}
                size="big"
              >
                <AddSvg color="#FFFFFF" />
              </CreateButton>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 lg:grid-cols-5 items-center w-full bg-gray-1100  p-3 lg:p-2.5 rounded-lg">
              <div className="col-span-1 lg:col-span-3 items-center flex">
                <Text15 color="primary" title="Email" />
              </div>
              <div className="col-span-2 grid grid-cols-2 lg:grid-cols-3 items-center">
                <div className="hidden lg:flex lg:col-span-2 items-center gap-1">
                  <Text15 title="Time of Debriefings" color="primary" />
                </div>
                <div className="flex lg:hidden col-span-1 items-center gap-1">
                  <Text15 title="Date" color="primary" />
                </div>
                <div className="col-span-1 lg:col-span-1">
                  <Text15 title="Method" color="primary" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-5 items-center w-full py-4 border-b-[1px] border-solid border-darkslategray-300 lg:border-none">
              <div className="col-span-1 lg:col-span-3 items-center flex">
                <Text15 color="white" title={debriefingData.email} />
              </div>
              <div className="col-span-2 grid grid-cols-2 lg:grid-cols-3 items-center">
                <div className="flex col-span-1 lg:col-span-2 items-center gap-1">
                  <Text15 title={time12Hour} color="[#7177EC]" />
                </div>
                <div className="col-span-1 lg:col-span-1">
                  <Text15 title={debriefingData.preference} color="[#7177EC]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center justify-between w-full">
              <div className="flex items-start gap-2.5">
                <LogoMark>
                  <ChatSvg color="#141414" />
                </LogoMark>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-inter font-semibold text-[15px] leading-[18px]">
                    Email Inbox
                  </span>
                  <Text13 color="primary" title="Overview your latest emails" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <SearchInput
                  className={
                    "relative bg-[#191919] flex items-center rounded-lg h-9 w-full 2xl:w-[387px]"
                  }
                  value={value}
                  setValue={setValue}
                  placeholder={"Search Email"}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 divide-y-[1px] divide-darkslategray-300 w-full overscroll overflow-y-auto h-full max-h-[300px] min-h-[530px] relative">
            {!loading ? (
              <>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <div
                      className="grid grid-cols-4 items-center py-4 gap-5"
                      key={index}
                    >
                      <div className="col-span-4 lg:col-span-1 flex items-center gap-2.5">
                        <div className="bg-[#696FEC] flex items-center justify-center text-center w-9 h-9 rounded-full">
                          <span className="text-sm text-white font-inter font-semibold">
                            {item.senderEmail
                              .split(" ")[0]
                              ?.slice(0, 2)
                              .toUpperCase() || "NA"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-[5px] flex-1">
                          <Text15
                            color="white"
                            title={item.senderEmail.split(" ")[0] || "n/a"}
                          />
                          <span
                            className={`text-xs w-[229px] leading-[15px] lg:text-xxs lg:leading-4 2xl:text-mini 2xl:leading-[18px] font-inter font-semibold text-primary block truncate `}
                          >
                            {item.subject}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 lg:col-span-2 flex items-center lg:px-6 lg:border-l-2 border-darkslategray-300 lg:border-r-2">
                        <Text15 title={item.text} color="primary" />
                      </div>
                      <div className="col-span-4 lg:col-span-1 flex items-center justify-between">
                        <div className="flex flex-col gap-[5px]">
                          <Text15
                            color="white"
                            title={new Date(
                              Number(item.timestamp._seconds) * 1000
                            ).toDateString()}
                          />
                          <Text15
                            color="primary"
                            title={new Date(
                              Number(item.timestamp._seconds) * 1000
                            ).toLocaleTimeString()}
                          />
                        </div>
                        <button
                          onClick={() => handleRead(item)}
                          className="flex items-center gap-[11px] bg-white rounded-lg py-2 px-4"
                        >
                          <Text13 color="background" title="Read" />
                          <ArrowRight color="#86878A" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center text-center text-sm text-white">
                    You are currently not set up! Please press setup!
                  </div>
                )}
              </>
            ) : (
              <div id="loading-bar-spinner" className="spinner">
                <div className="spinner-icon w-10 h-10 border-4 border-solid border-transparent rounded-full border-t-[#696FEC] border-l-[#696FEC]"></div>
              </div>
            )}
          </div>
        </div>
      )}
      {isMobile ? (
        showEmailPreview && (
          <div className="w-full">
            <EmailPreview
              content={readContent}
              data={data}
              setData={setData}
              onClick={onClick}
            />
          </div>
        )
      ) : (
        <div className="flex-1">
          <EmailPreview
            content={readContent}
            data={data}
            setData={setData}
            onClick={onClick}
          />
        </div>
      )}
      <SetUpEmail
        isOpen={isCreate}
        closeModal={() => setIsCreate(false)}
        category="Email"
        title="Setup Email"
      />
    </div>
  );
};

export default EmailsPage;
