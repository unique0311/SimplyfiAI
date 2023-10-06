import { TrashSvg } from "@/assets/images";
import Text13 from "../Text/Text13";
import TextBase from "../Text/TextBase";
import ActionButton from "../reminder/ActionButton";
import { useContext } from "react";
import { StateContext } from "@/context/StateContext";

const CategoryItem = ({ active, onClick, item, category ,data}) => {
    const { token, phoneNumber, api_url ,setSuccess,success} = useContext(StateContext);
    const handleDelete = async (item) => {
        let options = {
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method:'DELETE',
            body: JSON.stringify({"category":`${item}`})
        }
        let url=`${api_url}/${category === "inventory" ? "category" : "documents/category"}/${phoneNumber}`;
        await fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setSuccess(!success)
                }
            })
            .catch(err => console.log("error:" + err))
    }
    return (
        <div onClick={onClick} className={`p-[15px] cursor-pointer rounded-lg flex items-center justify-between ${active ? "send-bg bg-dimgray-800" : "bg-darkslategray-200"}`}>
            <div className="flex flex-col gap-1">
                <TextBase title={item} />
                <Text13 color="[#99999A]" title={`${data.length} Units`} />
            </div>
            <ActionButton
                onClick={() => handleDelete(item)}
                background={active ? "white bg-opacity-30" : "dimgray-800"}>
                <TrashSvg />
            </ActionButton>

        </div>
    )
}

export default CategoryItem;