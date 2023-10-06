import Text13 from "../Text/Text13";

export const CreateButton = ({ title, onClick, children, size }) => {
  return (
    <button
      onClick={onClick}
      className={`border-none outline-none send-bg gap-2 py-2 flex items-center  xl:px-3 px-4 rounded-lg ${
        size === "big"
          ? "w-full lg:w-[140px] justify-between"
          : size === "large"
          ? "w-full lg:w-[170px] justify-between"
          : "justify-center"
      }`}
    >
      <span className="text-white font-inter font-semibold leading-4 text-xxs">
        {title}
      </span>
      {children}
    </button>
  );
};
export const AddButton = ({ title, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="border-none outline-none add-bg flex gap-2 py-2 px-4 rounded-lg"
    >
      <span className="text-white font-inter font-semibold leading-4 text-xxs">
        {title}
      </span>
      {children}
    </button>
  );
};

export const GrayButton = ({ title, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-darkslategray-200 rounded-lg flex items-center justify-center py-2 
        ${
          size === "big"
            ? "px-[34px]"
            : size === "small"
            ? "px-7"
            : size === "xs"
            ? "px-4"
            : "px-6"
        }
         outline-none`}
    >
      <Text13 title={title} color="white" />
    </button>
  );
};
export const LoginButton = ({ title, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className={`loginBtn-bg flex items-center justify-center py-2 
        ${size === "big" ? "w-[140px]" : "px-6"}
         outline-none`}
    >
      <Text13 title={title} color="white" />
    </button>
  );
};
