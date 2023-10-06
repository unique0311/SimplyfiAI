import ActiveReminderBg from "@/assets/images/active-reminderBg.png"

const ActiveReminderLayout =({children})=>{
    return (
    <div className="py-5 px-6 rounded-[10px] flex flex-col gap-6 w-full" style={{background:`url(${ActiveReminderBg.src}) no-repeat center`, backgroundSize:'cover'}}>
        {children}
    </div>
    )
}

export default ActiveReminderLayout;