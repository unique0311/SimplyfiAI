import { ReminderSvg } from "@/assets/images";
import ActiveReminderLayout from "../ActiveReminderLayout";
import LogoMark from "../chat/LogoMark";
import Text15 from "../Text/Text15";
import ButtonArrow from "../ButtonArrow";
import { useContext } from "react";
import { StateContext } from "@/context/StateContext";
import styles from "./EmailPreview.module.css";

const hideScrollBarStyles = {
  // For Webkit browsers like Chrome and Safari
  "--webkit-scrollbar": {
    width: "0",
    height: "0",
    background: "transparent",
  },
  // For Firefox
  scrollbarWidth: "none",
  // For IE and Edge
  msOverflowStyle: "none",
};

const EmailPreview = ({ data, onClick, content, setData }) => {
  const isMobile = window.innerWidth <= 768;
  const { api_url, phoneNumber, token } = useContext(StateContext);

  const handleClearAll = async () => {
    let options = {
      method: "DELETE",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(`${api_url}/emails/deleteAll/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`py-[27px] px-[22px] flex flex-col gap-5 lg:w-[330px] lg:h-[calc(100vh+200px)] rounded-r-lg max-h-[90vh] overflow-y-auto relative ${styles.emailPreviewContainer}`}
      style={{ background: "linear-gradient(0deg, #222222, #222222), #E0DCF9" }}
    >
      <ActiveReminderLayout>
        <div className="flex items-center gap-3">
          <LogoMark>
            <ReminderSvg color="black" />
          </LogoMark>
          <div className="flex flex-col">
            <Text15 title="Show of Emails" color="white" />
            <Text15 title={Array.isArray(data) && data.length} color="white" />
          </div>
        </div>
        <div className="max-w-[123px] w-full">
          <ButtonArrow title="Clear All" onClick={handleClearAll} />
        </div>
      </ActiveReminderLayout>
      <div className="flex flex-col gap-3.5">
        <Text15
          color="white"
          title={`Email Preview (To: ` + content?.receiverEmail + ")"}
        />
        {content !== undefined && (
          <div className="bg-[#696FEC] flex items-center justify-center text-center w-9 h-9 rounded-full">
            <span className="text-sm text-white font-inter font-semibold uppercase">
              {content?.senderEmail.split(" ")[0]?.slice(0, 2).toUpperCase() ||
                "NA"}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-[5px]">
            <Text15
              color="white"
              title={
                content?.senderEmail
                  ? `${content?.senderEmail.split(" ")[0]} (${
                      content?.senderEmail.split("<")[1]?.split(">")[0] ||
                      content?.senderEmail ||
                      "n/a"
                    })`
                  : "n/a"
              }
            />

            <Text15 color="primary" title={content?.subject} />
          </div>
          <div className="h-full max-h-[500px] overflow-y-auto flex flex-col gap-[18px] no-scrollbar">
            {content !== undefined && (
              <span
                className={`text-xs leading-[15px] lg:text-xxs lg:leading-4 2xl:text-mini 2xl:leading-[18px] font-inter font-semibold text-primary`}
              >
                {content?.text}
              </span>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <div className="z-50">
          <button
            className="text-black bg-white text-sm rounded-lg py-2 px-3"
            onClick={onClick}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailPreview;
