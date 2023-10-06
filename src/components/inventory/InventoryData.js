import { useContext,useEffect,useState } from "react";
import LogoMark from "../chat/LogoMark";
import { AddSvg, CheckedBoxSvg, InventorySvg } from "@/assets/images";
import Text13 from "../Text/Text13";
import SearchInput from "../Input/SearchInput";
import { CreateButton } from "../button/CreateButton";
import Categories from "../document/Categories";
import Text15 from "../Text/Text15";
import CatgeoryPopup from "../popup/CategoryPopup";
import CreateInventoryItem from "../popup/CreateInventoryItem"
import MobileCategory from "../document/MobileCategory";
import { StateContext } from "@/context/StateContext";

const InventoryData = () => {
    const { token, phoneNumber, api_url,setSuccess,success } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState("")
    const getInventory =async ()=>{
        await fetch(`${api_url}/inventory/${phoneNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${token}`
            },
        })
        .then((Response)=>Response.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                setData(res.list)
            }
        })
        .catch(err=>console.log("error:" + err));
    }
    const handleGetCategory =async ()=>{
        let options={
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
        }
        await fetch(`${api_url}/category/${phoneNumber}`,options)
        .then(res=>res.json())
        .then(res=>{
            setCategoryData(res.list)
        })
        .catch(err=>console.log("error:" + err))
        
    }
    async function HandleDelete(id){
        let options ={
            headers: {
                authorization: `token ${token}`
            },
            method:'DELETE'
          }
          await fetch(`${api_url}/inventory/${phoneNumber}`,options)
          .then(res=>res.json())
          .then(res=>{
          })
          .catch(err=>console.log("error:" + err))
    }
    async function handleSearch(){
        await fetch(`${api_url}/searchInventory/${phoneNumber}`,{
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:`{
                "searchTerm":"${value}"
            }`
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                setData(res.list);  
            }
        })
        .catch(err=>console.log(err))
    }
    async function handleGetCategoryData(){
        let options={
            headers: {
                authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:`{
                "category":"${categoryValue}"
            }`
        }
        await fetch(`${api_url}/inventorybycategory/${phoneNumber}`,options)
        .then(res=>res.json())
        .then(res=>{
            setData(res.list)
        })
        .catch(err=>console.log("error:" + err))
    }
    useEffect(()=>{
        getInventory();
    },[])
    useEffect(()=>{
        handleGetCategory()
    },[success,open])
    useEffect(()=>{
        handleGetCategoryData()
    },[categoryValue])
    function onChange(e){
        const {value} = e.target
        setValue(value);
        if(value===""){
            getInventory()
        }
        
    }
    console.log(data);
    return (
        <div className="bg-[#141414] flex flex-col lg:flex-row gap-12 w-full rounded-lg">
            <div className='flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8'>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center justify-between w-full">
                    <div className='flex items-start gap-2.5'>
                        <LogoMark>
                            <InventorySvg color="#0E0E0E" />
                        </LogoMark>
                        <div className='flex flex-col gap-1'>
                            <span className='text-white font-inter font-semibold text-[15px] leading-[18px]'>
                                Search Inventory
                            </span>
                            <Text13 color="primary"
                                title="Manage your reminers with simplify!" />
                        </div>

                    </div>
                    <MobileCategory 
                            value={categoryValue}
                            setValue={setCategoryValue}
                            placeholder={"Select Category"} 
                            data={categoryData}
                    />
                    <div className='flex flex-col mt-2 xl:mt-0 xl:flex-row xl:items-center gap-2'>
                        <SearchInput className={"relative bg-[#191919] flex items-center rounded-lg h-9 2xl:w-[387px]"}
                            value={value}
                            onChange={onChange}
                            onClick={handleSearch}
                            placeholder={"Search Inventory"} />
                        <CreateButton title="Create" onClick={() => setIsOpen(true)} size="big">
                            <AddSvg color="#FFFFFF" />
                        </CreateButton>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className='w-full hidden xl:grid grid-cols-9 items-center bg-gray-1100 px-4 rounded-lg py-2.5'>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Item" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Price" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Bought" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Total Cost" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Sales Price" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Net Profit" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="Gross Margin" />
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Text13 color="primary" title="# Sold" />
                        </div>
                        <div className="col-span-1 flex items-center ml-auto">
                            <Text13 color="primary" title="Total Profit" />
                        </div>

                    </div>
                    <div className='h-full max-h-[640px] min-h-[640px] flex flex-col divide-y-[1px] divide-[#343434]  overflow-y-auto w-full overscroll lg:scrollbar'>
                        {
                            Array.isArray(data)?data.map((item, index) => (
                                <div className="w-full grid grid-cols-5 gap-y-2 xl:grid-cols-9 items-center py-3.5 px-4" key={index}>
                                    <div className="col-span-2 xl:col-span-1 flex items-center gap-2">
                                        <CheckedBoxSvg />
                                        <Text15 color="white" title={item.item}/>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="primary" title={`$${item.Price}`} />

                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="white" title={item.boughtQuantity} />
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="primary" title={`$${item.totalCost}`} />
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="primary" title={`$${item.salePrice}`} />
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="primary" title={`$${item.netProfit}`} />
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="white" title={`${item.margin}`} />
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <Text15 color="white" title={item.soldQuantity} />
                                    </div>
                                    <div className="col-span-1 ml-auto flex items-center">
                                        <Text15 color="forestgreen" title={`$${item.totalProfit}`} />
                                    </div>

                                </div>
                            )):null
                        }
                    </div>
                </div>
            </div>
            <div className='hidden xl:block flex-1'>
                <Categories 
                    setOpen={setOpen} 
                    isOpen={open} 
                    data={categoryData}
                    total={data}
                    category="inventory"
                    setInventoryData={setData}/>
            </div>
            <CatgeoryPopup
                isOpen={open}
                closeModal={() => setOpen(false)}
                title="Create Category"
                category="inventory"
            />
            <CreateInventoryItem 
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                title="Create an Item"
                category="inventory" />
        </div>
    )
}

export default InventoryData;