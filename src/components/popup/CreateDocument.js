import { useState, useContext, useEffect } from "react";
import { CreateButton } from "../button/CreateButton";
import { AddSvg, CheckedBoxSvg } from "@/assets/images";
import Modal from "./index";
import PopupInputBox from "../Input/PopupInput";
import SelectBox from "../Input/SelectBox";
import { StateContext } from "@/context/StateContext";

const CreateDocument = ({ isOpen, closeModal, title, category }) => {
  const { api_url, phoneNumber, token } = useContext(StateContext);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [log, setLogs] = useState("");
  const [ppt, setPpt] = useState(false);
  const [concurrent, setConcurrent] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown timer in seconds

  const ModeData = [
    {
      value: "fast",
      name: "Fast (For really detailed works, >45 seconds to generate)",
    },
    {
      value: "fast2",
      name: "Fast v2 (Mix of modes, takes 1-2 mins to generate)",
    },
    {
      value: "detailed",
      name: "Detailed (For Medical notes and contracts, 3-5 mins to generate)",
    },
  ];

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
        console.log("handleGetTeam: ", res.profile);
        setProfileData(res.profile);
      })
      .catch((err) => console.log("error:" + err));
    return true;
  }

  useEffect(() => {
    handleGetTeam();
  }, []);

  const handleGetStatus = async () => {
    await fetch(`${api_url}/status/${id}`, {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("HandleGetStatus: ", data);
        setLogs(data.status);
        if (data.status === "Done") {
          closeModal();
        }
      });
  };

  useEffect(() => {
    if (id !== "" && setStatus !== "Done") {
      setInterval(() => {
        handleGetStatus();
      }, [1000]);
    }
  }, [id]);

  useEffect(() => {
    // Start the countdown when the button is disabled
    if (isAdding) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            setIsAdding(false);
            return 5; // Reset the countdown timer
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isAdding]);

  const handleCreate = async () => {
    if (isAdding) {
      return; // If the button is already disabled, return early
    }

    setIsAdding(true);
    setCountdown(5); // Reset the countdown timer

    let options = {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        topic: content,
        ppt: ppt,
        email: email,
        concurrent: concurrent,
        mode: name,
      }),
    };
    console.log("handleCreate options: ", options);

    await fetch(`${api_url}/documents/${phoneNumber}`, options)
      .then((res) => res.json())
      .then(async (res) => {
        console.log("handleCreate: ", res);
        if (res.success) {
          setId(res.id);
        }
      })
      .catch((err) => console.log("error:" + err));
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={title}
      category={category}
    >
      <div className="flex flex-col gap-5 mt-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-inter font-medium text-primary">
              Method
            </span>
            <SelectBox
              value={name}
              setValue={setName}
              placeholder={"Select the Method"}
              data={ModeData}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-inter font-medium text-primary">
              Content
            </span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-bg border-px border-[#2B2B2B] w-full px-4 pt-3 h-[85px] rounded-3xs text-sm font-inter font-medium text-primary outline-none"
              placeholder="The world of private lending"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-inter font-medium text-primary">
              Email
            </span>
            <PopupInputBox
              value={email}
              setValue={setEmail}
              placeholder={"email@gmail.com"}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between md:w-full">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ppt}
                onChange={(e) => setPpt(e.target.checked)}
                className="accent-darkslategray-200 bg-darkslategray-200 w-4 h-4"
              />

              <span className="text-sm font-inter font-medium text-primary">
                PowerPoint
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={concurrent}
                onChange={(e) => setConcurrent(e.target.checked)}
                className="accent-darkslategray-200 w-4 h-4"
              />
              <span className="text-sm font-inter font-medium text-primary">
                Concurrent
              </span>
            </div>
          </div>
          <CreateButton
            title={isAdding ? `Adding (${countdown}s)` : "Add"}
            onClick={handleCreate}
            size="big"
            disabled={isAdding}
          >
            <AddSvg color="#FFFFFF" />
          </CreateButton>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <span className="text-sm font-inter font-medium text-primary">
            Logs
          </span>
          <PopupInputBox value={log} setValue={setLogs} placeholder={""} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateDocument;
