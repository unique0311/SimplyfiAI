import closeSvg from "@/assets/images/close.svg"
import { useEffect, useState } from "react";

const AlertBox = ({ type, message, onClick }) => {
    const [background, setBackground] = useState("bg-functionFeature-1000");
    useEffect(() => {
        switch (type) {
            case "error":
                setBackground("bg-functionError-1000");
                break;
            case "warning":
                setBackground("bg-functionWarn-1000");
                break;
            case "success":
                setBackground("bg-purple-400");
                break;
            default:
                setBackground("bg-functionFeature-1000");
        }
    }, [type]);

    return (
        <div className={`flex items-center gap-2 justify-between ${background} rounded-lg py-3 px-3.5`} onClick={onClick}>
            <span className="text-white font-semibold">{message}</span>
            <span className="flex items-center justify-center select-none text-white cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <mask
                        id="mask0_360_890"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={24}
                        height={24}
                    >
                        <rect width={24} height={24} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_360_890)">
                        <path
                            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                            fill="white"
                        />
                    </g>
                </svg>

            </span>
        </div>
    );
};

export default AlertBox;
