import SearchInput from "@/components/Input/SearchInput";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import fileSvg from "@/assets/images/file.svg";
import CatgeoryPopup from "@/components/popup/CategoryPopup";
import { CreateButton, GrayButton } from "@/components/button/CreateButton";
import { AddSvg, DocumentsSvg, TrashSvg } from "@/assets/images";
import LogoMark from "@/components/chat/LogoMark";
import Text13 from "@/components/Text/Text13";
import ActionButton from "@/components/reminder/ActionButton";
import Categories from "@/components/document/Categories";
import CreateDocument from "@/components/popup/CreateDocument";
import Text15 from "@/components/Text/Text15";
import MobileCategory from "@/components/document/MobileCategory";
import { StateContext } from "@/context/StateContext";
import pptImg from "@/assets/images/ppt.png";
const DocumentsPage = () => {
  const { api_url, phoneNumber, token, success } = useContext(StateContext);
  const [value, setValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  // right sidebar category
  const [categoryData, setCategoryData] = useState([]);
  // end
  const [isCreate, setIsCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const [data, setData] = useState([]);

  async function handleGetDocument() {
    let options = {
      headers: {
        authorization: `token ${token}`,
      },
      method: "GET",
    };
    await fetch(`${api_url}/documents/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("handleGetDocumentData: ", res.list);
          setData(res.list);
        }
      })
      .catch((err) => console.log("error:" + err));
  }

  const handleGetCategory = async () => {
    let options = {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(`${api_url}/documents/category/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("setCategoryData:", res.list);
          setCategoryData(res.list);
        }
      })
      .catch((err) => console.log("error:" + err));
  };

  useEffect(() => {
    if (!isCreate) {
      handleGetDocument();
    }
  }, [isCreate]);

  useEffect(() => {
    handleGetCategory();
  }, [success, open]);

  const handleDelete = async (id) => {
    let options = {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    };
    await fetch(`${api_url}/documents/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleGetDocument();
        }
      })
      .catch((err) => console.log("error:" + err));
  };

  const handleSelect = (index) => {
    if (selected === index) {
      setClickCount(clickCount + 1);
    } else {
      setSelected(index);
      setClickCount(1);
    }
  };

  const handleDoubleClick = (link) => {
    if (clickCount === 2) {
      window.open(link);
    }
    setClickCount(0);
  };

  console.log("data_value: ", value);
  const handleFilter = async () => {
    let options = {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    };
    if (value !== "") {
      const formattedValue = value.toLowerCase();
      await fetch(
        `${api_url}/documents/types/${formattedValue}/${phoneNumber}`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("handleFilter: ", res.documents);
          setData(res.documents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearchClick = async () => {
    handleFilter();
  };

  function onChange(e) {
    const { value } = e.target;
    setValue(value);
    if (value === "") {
      handleGetDocument();
    }
  }
  console.log("DataList: ", data);
  return (
    <div className="bg-[#141414] flex flex-row gap-6 2xl:gap-12 w-full lg:h-[calc(100vh-150px)] rounded-lg">
      <div className="flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8 ">
        <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center justify-between w-full">
          <div className="flex items-start gap-2.5">
            <LogoMark>
              <DocumentsSvg color="#141414" />
            </LogoMark>
            <div className="flex flex-col gap-1">
              <span className="text-white font-inter font-semibold text-[15px] leading-[18px]">
                Documents
              </span>
              <Text13
                color="primary"
                title="Manage your reminers with simplify!"
              />
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-2">
            <SearchInput
              className={
                "relative bg-[#191919] flex items-center rounded-lg h-9 2xl:w-[387px]"
              }
              value={value}
              onChange={onChange}
              onClick={handleSearchClick}
              placeholder={"Documents(docs,powerpoint)"}
            />
            <GrayButton
              size="xs"
              title="Filter by Type"
              onClick={handleFilter}
            />
            <CreateButton
              title="Create"
              onClick={() => setIsCreate(true)}
              size="big"
            >
              <AddSvg color="#FFFFFF" />
            </CreateButton>
          </div>
        </div>
        <div className="flex flex-col xl:hidden gap-3.5">
          <div className="flex items-center gap-3">
            <CreateButton
              title="Create"
              onClick={() => setIsCreate(true)}
              size="small"
            >
              <AddSvg color="#FFFFFF" />
            </CreateButton>
            <button className="border-none outline-none bg-white gap-2 py-2 flex items-center px-4 rounded-lg">
              <Text13 title="Add Category" color="gray-1200" />
              <AddSvg color="#141414" />
            </button>
          </div>
          <MobileCategory
            data={categoryData}
            value={categoryValue}
            setValue={setCategoryValue}
            placeholder={"Select Category"}
          />
          <div className="w-full h-px bg-[#2B2B2B] block"></div>
        </div>
        <div className="xl:mt-6 w-full h-full overflow-hidden rounded-lg">
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5 lg:gap-5 overscroll overflow-y-auto lg:max-h-[700px] 2xl:max-h-full">
            {data.map((item, index) => (
              <div
                onClick={() => handleSelect(index)}
                onDoubleClick={() => handleDoubleClick(item.link)}
                key={index}
                className={`col-span-2 lg:col-span-3 xl:col-span-1 text-[#6A6A6C] flex flex-col gap-3.5 docu-bg bg-gray-800 py-2 px-2.5 lg:py-3 lg:px-4 rounded-3xs shadow-5xl h-fit ${
                  selected === index
                    ? "border-px border-solid border-primary border-opacity-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="file"
                    src={item.type === "docs" ? fileSvg : pptImg}
                  />
                  <Text15 color="white" title={item.topic} />
                </div>

                <div className="flex items-center gap-2 text-gray-800">
                  <ActionButton
                    background="gray-800"
                    onClick={() => handleDelete(index)}
                  >
                    <TrashSvg />
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden xl:flex flex-1">
        <Categories
          isOpen={open}
          setInventoryData={setData}
          data={categoryData}
          total={data}
          category="document"
          setOpen={setOpen}
        />
      </div>
      <CatgeoryPopup
        isOpen={open}
        closeModal={() => setOpen(false)}
        title="Create Category"
        category="document"
      />
      <CreateDocument
        isOpen={isCreate}
        closeModal={() => setIsCreate(false)}
        title="Create Document"
        category="document"
      />
    </div>
  );
};

export default DocumentsPage;
