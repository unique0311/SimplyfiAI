import AlertBox from "@/components/alert/AlertBox";
import { ReactNode, createContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
const NotificationType = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
  };
const NotificationContext = createContext({
    sendPromiseNotification: () => {},
});

const NotificationProvider = ({ children }) => {
    const sendPromiseNotification = (
        type,
        contents,
        id,
        duration = 2000,
    ) => {
        let content = contents;
        if (content.length > 200) {
            content = content.substring(0, 200) + '...';
        }
        switch (type) {
            case NotificationType.SUCCESS:
                toast.custom(<AlertBox message={content} type="success" onClick={() => toast.dismiss(id)} />, {
                    id: id,
                    duration: duration,
                    position: "bottom-center",
                });
                break;
            case NotificationType.ERROR:
                toast.custom(<AlertBox message={content} type="error" onClick={() => toast.dismiss(id)} />, {
                    id: id,
                    duration: duration,
                    position: "bottom-center",
                });
                break;
            default:
                // Handle other notification types here (if needed)
                break;
        }
    };

    return (
        <NotificationContext.Provider value={{ sendPromiseNotification }}>
            <Toaster position="bottom-center" containerStyle={{ marginBottom: '32px' }} />
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider,NotificationType };
