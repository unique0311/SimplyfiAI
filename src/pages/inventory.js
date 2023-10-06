import Image from 'next/image';
import AreaCharts from '@/components/chart/AreaChart';
import { useContext, useEffect, useState } from 'react';
import { CreateButton } from '@/components/button/CreateButton';
import CategoryItem from '@/components/popup/CategoryItem';
import LogoMark from '@/components/chat/LogoMark';
import { InventorySvg, ReminderSvg } from '@/assets/images';
import Text13 from '@/components/Text/Text13';
import TotalItem from '@/components/inventory/TotalItem';
import Text15 from '@/components/Text/Text15';
import Text12 from '@/components/Text/Text12';
import InventoryData from '@/components/inventory/InventoryData';
import { StateContext } from '@/context/StateContext';
import BarCharts from '@/components/chart/BarChart';
const InventoryPage = () => {
    const { token, phoneNumber, api_url } = useContext(StateContext);
    const [catetory, setCategory] = useState("Catgeory 1");
    //create category
    const [inventoryState, setInventoryState] = useState();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    async function handleInventoryState(){
        let options = {
            headers: {
                authorization: `token ${token}`
            },
        }
        await fetch(`${api_url}/inventory/stats/${phoneNumber}`,options)
        .then(res=>res.json())
          .then(res=>{            
            setInventoryState(res.stats)
          })
          .catch(err=>console.log("error:" + err))
    }
    useEffect(()=>{
        handleInventoryState()
    },[])
    function handleCreate() {
        setIsCreateOpen(true)
    }
    const changeCategory = (text) => {
        setCategory(text)
    }
    const handleSave = () => {
        async function handlesave(){
            let options = {
                headers: {
                    authorization: `token ${token}`
                },
            }
            await fetch(`${api_url}/inventory/sheet/${phoneNumber}`, options)
            .then(res => res.json())
            .then(res => {            
                // Opens a new URL in the browser
                window.open(`https://docs.google.com/spreadsheets/d/${res.sheetId}`, '_blank');
            })
            .catch(err => console.log("error:" + err))
        }
        handlesave();
    }
    
    
    return (
        <div className='flex flex-col gap-4'>
            <div className="bg-[#141414] flex flex-col lg:flex-row lg:gap-6 2xl:gap-12 w-full rounded-lg">
                <div className='flex flex-col gap-4 w-full pt-6 pb-7 px-[26px] xl:pr-0 xl:pl-8'>
                    <div className='flex items-start gap-2.5'>
                        <LogoMark>
                            <InventorySvg color="#141414" />
                        </LogoMark>
                        <div className='flex flex-col gap-1'>
                            <span className='text-white font-inter font-semibold text-[15px] leading-[18px]'>
                                Inventory
                            </span>
                            <Text13 color="primary"
                                title="Manage your reminers with simplify!" />
                        </div>

                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='grid grid-cols-2 gap-4 col-span-2 2xl:col-span-1'>
                            <div className='col-span-2 2xl:col-span-1'>
                                <TotalItem
                                    title="Total Cost"
                                    description="This is description text over the section total cost."
                                    price={inventoryState ===null || inventoryState?.totalCost===undefined ?"0":`$${inventoryState?.totalCost}`}
                                />
                            </div>
                            <div className='col-span-2 2xl:col-span-1'>
                                <TotalItem
                                    title="Total Units"
                                    description="This is description text over the section total cost."
                                    price={inventoryState ===null || inventoryState?.totalUnits===undefined ?"0":`$${inventoryState?.totalUnits}`}
                                />
                            </div>
                            <div className='col-span-2 border-px border-gray-700 bg-[#141414] flex flex-col gap-8 rounded-3xs pt-5 px-6 pb-10'>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex items-center gap-2'>
                                        <LogoMark>
                                            <ReminderSvg color="#0E0E0E" />
                                        </LogoMark>
                                        <Text15 title="Inventory Value" color="white" />
                                    </div>
                                    <CreateButton onClick={handleSave} title="View" />
                                </div>
                                <div className='flex flex-col lg:flex-row items-center justify-start gap-2 xl:gap-5'>
                                    <BarCharts />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-start justify-between col-span-2 2xl:col-span-1 gap-5 border-px border-gray-700 rounded-md pb-6 '>
                            <div className='flex items-start justify-between w-full pt-[25px] pr-[42px] pl-[26px] pb-5'>
                                <div className='flex items-center gap-2'>
                                    <Text15 color="white" title="Value Chart" />
                                </div>
                                <div className='flex items-center gap-6 mt-2'>
                                    <div className='flex flex-col gap-1.5 text-center'>
                                        <Text12 color="primary" text="Total Profit" />
                                        <span className='text-forestgreen font-bold font-inter text-xl leading-6'>
                                        {inventoryState===null || inventoryState?.totalProfit===undefined?"0":`$${inventoryState?.totalProfit}`}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1.5 text-center'>
                                        <Text12 color="primary" text="Total Value" />
                                        <span className='text-white font-bold font-inter text-xl leading-6'>
                                        {inventoryState===null|| inventoryState?.totalValue===undefined?"0":`$${inventoryState?.totalValue}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <AreaCharts />
                        </div>
                    </div>
                </div>
            </div>
            <InventoryData />
            <CategoryItem
                isOpen={isCreateOpen}
                closeModal={() => setIsCreateOpen(false)}
                title="Create an Item"
            />
        </div>


    )
}


export default InventoryPage;