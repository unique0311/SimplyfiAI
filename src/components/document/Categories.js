import { useState, useEffect, useContext } from "react";
import Text15 from "../Text/Text15";
import { GrayButton } from "../button/CreateButton";
import CategoryItem from "./CategoryItem";
import { StateContext } from "@/context/StateContext";

const Categories = ({ setOpen, total, setInventoryData, data, category }) => {
  console.log("categories", data);
  const { token, phoneNumber, api_url } = useContext(StateContext);
  const [selected, setSelected] = useState();
  const handleSelect = async (index, item) => {
    setSelected(index);
    let options = {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: `{
                "category":"${item}"
            }`,
    };
    console.log("handleSelect option: ", options);
    await fetch(`${api_url}/inventorybycategory/${phoneNumber}`, options)
      // await fetch(`${api_url}/documents/${phoneNumber}`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.list, "==============>");
        setInventoryData(res.list);
      })
      .catch((err) => console.log("error:" + err));
  };
  return (
    <div
      className="py-[27px] px-[22px] flex flex-col gap-[17px] lg:w-[330px] rounded-r-lg h-full"
      style={{
        background:
          "linear-gradient(0deg, #222222, #222222),linear-gradient(0deg, #E0DCF9, #E0DCF9)",
      }}
    >
      <div className="flex items-center justify-between">
        <Text15 title="Categories" color="white" />
        <GrayButton size="small" title="Add" onClick={() => setOpen(true)} />
      </div>
      <div className="flex flex-col gap-3 overscroll overscroll-y-auto">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <CategoryItem
              key={index}
              active={selected === index}
              onClick={() => handleSelect(index, item)}
              item={item}
              category={category}
              data={data}
            />
          ))}
      </div>
    </div>
  );
};

export default Categories;
