import { useContext } from "react";
import ContentHeader from "./ContentHeader";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";
import { StateContext } from "@/context/StateContext";
import LoginPage from "@/pages/Login";

const Layout = ({ children }) => {
    const { authorized } = useContext(StateContext);
    return (
        <div className="h-full">
            {
                authorized ? <div className="flex flex-col xl:flex-row w-full">
                    <Sidebar />
                    <MobileHeader />
                    <div className="2xl:w-[calc(100%-283px)] w-full xl:ml-[283px] flex min-h-screen flex-col gap-6 items-center xl:pr-[18px] bg-[#0E0E0E]">
                        <ContentHeader />
                        <div className="rounded-lg w-full xl:pl-9">
                            {children}
                        </div>
                    </div>
                </div> :
                    <LoginPage />
            }
        </div>
    )
}

export default Layout;