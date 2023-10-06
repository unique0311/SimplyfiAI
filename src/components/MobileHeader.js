import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { ChatSvg, DocumentsSvg, ReminderSvg, InventorySvg, SettingSvg, MenuSvg, EmailSvg } from "@/assets/images";
import EarnBox from "./EarnBox";
import useMediaQuery from "./hooks/useMedia";
import LinkLabel from "./Text/Label";
import CustomLink from "./Text/CustomLink";
import Logo from "./Logo";
const MobileHeader = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handlecloseMenu = () => {
        setOpen(false)
    }
    const mobile = useMediaQuery('(min-width: 1024px)')
    useEffect(()=>{
        if(mobile){
            setOpen(false)
        }
    },[mobile])
    const LogoHeader =()=>{
        return (
            <div className={`flex xl:hidden items-center justify-between w-full pl-[18px] pr-9 pt-2.5 pb-0.5`}>
                    <Logo />
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center justify-center">
                        <MenuSvg />
                    </button>
                </div>
        )
    }
    return (
        <>
            <LogoHeader />
            <div className={`${open ? 'flex' : 'hidden'} fixed top-0 flex-col bg-background h-full overflow-y-scroll pb-9 z-[100] w-full`}>
                <LogoHeader />
                <div className="flex flex-col gap-3.5 px-9 mb-20">
                    <CustomLink href="/" onClick={handlecloseMenu} active={router.pathname === "/"}>
                        <ChatSvg color={router.pathname === "/" ? "white" : "#939393"} />
                        <LinkLabel title="Chat" />
                    </CustomLink>
                    <CustomLink href="/reminder" onClick={handlecloseMenu} active={router.pathname === "/reminder"}>
                        <ReminderSvg color={router.pathname === "/reminder" ? "white" : "#939393"} />
                        <LinkLabel title="Reminders" />
                    </CustomLink>
                    <CustomLink href="/emails" onClick={handlecloseMenu} active={router.pathname === "/emails"}>
                        <EmailSvg color={router.pathname === "/emails" ? "white" : "#939393"} />
                        <LinkLabel title="Emails" />
                    </CustomLink>
                    <CustomLink href="/setting" onClick={handlecloseMenu} active={router.pathname === "/setting"}>
                        <SettingSvg color={router.pathname === "/setting" ? "white" : "#939393"} />
                        <LinkLabel title="Settings" />
                    </CustomLink>
                    <CustomLink href="/inventory" onClick={handlecloseMenu} active={router.pathname === "/inventory"}>
                        <InventorySvg color={router.pathname === "/inventory" ? 'white' : '#939393'} />
                        <LinkLabel title="Inventory" />
                    </CustomLink>
                    <CustomLink href="/document" onClick={handlecloseMenu} active={router.pathname === "/document"}>
                        <DocumentsSvg color={router.pathname === "/document" ? 'white' : '#939393'} />
                        <LinkLabel title="Documents" />
                    </CustomLink>
                </div>
                <EarnBox />
            </div>
        </>
    )
}

export default MobileHeader;

