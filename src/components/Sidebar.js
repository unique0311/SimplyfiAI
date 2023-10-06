import EarnBox from "./EarnBox";
import Logo from "./Logo";
import NavItems from './NavItems';
const Sidebar = () => {
    return (
        <div className="hidden fixed top-0 xl:flex flex-col items-start justify-between gap-20 2xl:gap-0 h-full bg-background lg:w-[283px] pt-4 2xl:pt-[15px] pb-4 px-[26px] overflow-y-auto 2xl:overflow-y-hidden overscroll">
            <div className="flex flex-col 2xl:gap-2 mx-auto w-full">
                <Logo />
                <div className="flex flex-col gap-2">
                    <div className="text-[13px] leading-4 font-inter font-semibold text-primary inline-block">
                        Menu
                    </div>
                    <NavItems />
                </div>
            </div>
            <EarnBox />
        </div>
    )
}

export default Sidebar;