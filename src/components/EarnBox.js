import ArrowRight from "@/assets/images/sidebar/arrowRight";
import ButtonArrow from "./ButtonArrow";
import EarnBg from "@/assets/images/sidebar/earn-bg.svg"
import { useContext } from "react";
import { StateContext } from "@/context/StateContext";
const EarnBox =()=>{
    const {api_url, token,logoutHandler} = useContext(StateContext)
    let url =`${api_url}/logout`
    let options = {
        method: 'POST',
        headers: {
          'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          Accept: 'application/json, text/plain, /',
          'Content-Type': 'application/json',
          Referer: 'http://localhost:3000/',
          'sec-ch-ua-mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
          'sec-ch-ua-platform': '"Windows"',
          authorization: `token ${token}`
        },
      };
    const handleLogout =async()=>{
        logoutHandler()
        await fetch(url, options)
        .then(res=>res.json())
        .then(json => {
            if(json.success){
                logoutHandler()
            }
            
        })
        .catch(err => console.error('error:' + err));       
    }
    return (
        <div className="flex flex-col items-center justify-center gap-7 mx-auto w-full max-w-[230px]">
                <div className="flex flex-col  items-center justify-between text-center h-full min-h-[251px]  rounded-[10px] py-9 px-10" 
                style={{background:`url(${EarnBg.src}) no-repeat center`}}>
                    <div className="flex flex-col items-center gap-[13px]">
                        <span className="text-xl leading-6 text-white inline-block font-inter font-semibold">
                            Explore our new Excel maker!
                        </span>
                        <span className="text-white text-opacity-60 text-sm leading-4 font-inter font-medium">
                            Our beta Excel creator can take your live data and create detailed Excel reports!
                        </span>
                        <span></span>
                    </div>
                   <ButtonArrow title="Learn more" />
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-[11px] bg-white rounded-lg py-2 px-4">
                        <span className=" text-background text-base font-TTHovesMedium ">
                            Log out
                        </span>
                        <ArrowRight color="#86878A" />
                    </button>
                    <button
                        className="flex items-center gap-[11px] rounded-lg py-2 px-4"
                        style={{ background: 'linear-gradient(90deg, #474EEB 0%, #7177EC 100%), #000000' }}
                    >
                        <span className=" text-white text-base font-TTHovesMedium ">
                            Discord
                        </span>
                        <ArrowRight color="#FFF" />
                    </button>
                </div>

            </div>
    )
}

export default EarnBox;