import { useRouter } from "next/router";
import LinkLabel from "./Text/Label";
import { ChatSvg, DocumentsSvg, EmailSvg, InventorySvg, ReminderSvg, SettingSvg } from "@/assets/images";
import CustomLink from "./Text/CustomLink";

const NavItems = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col justify-center gap-2 2xl:gap-3.5">
            <CustomLink href="/" onClick={() => { }} active={router.pathname === "/"}>
                <ChatSvg color={router.pathname === "/" ? "white" : "#939393"} />
                <LinkLabel title="Chat" />
            </CustomLink>
            <CustomLink href="/reminder" onClick={() => { }} active={router.pathname === "/reminder"}>
                <ReminderSvg color={router.pathname === "/reminder" ? "white" : "#939393"} />
                <LinkLabel title="Reminders" />
            </CustomLink>
            <CustomLink href="/emails" onClick={() => { }} active={router.pathname === "/emails"}>
                <EmailSvg color={router.pathname === "/emails" ? "white" : "#939393"} />
                <LinkLabel title="Emails" />
            </CustomLink>
            <CustomLink href="/setting" onClick={() => { }} active={router.pathname === "/setting"}>
                <SettingSvg color={router.pathname === "/setting" ? "white" : "#939393"} />
                <LinkLabel title="Settings" />
            </CustomLink>
            <CustomLink href="/inventory" onClick={() => { }} active={router.pathname === "/inventory"}>
                <InventorySvg color={router.pathname === "/inventory" ? 'white' : '#939393'} />
                <LinkLabel title="Inventory" />
            </CustomLink>
            <CustomLink href="/document" onClick={() => { }} active={router.pathname === "/document"}>
                <DocumentsSvg color={router.pathname === "/document" ? 'white' : '#939393'} />
                <LinkLabel title="Documents" />
            </CustomLink>
        </div>
    )
}

export default NavItems;