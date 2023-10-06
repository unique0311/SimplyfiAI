const LogoMark = ({ children, size }) => {
  return (
    <div
      className={`shadow-custom rounded-md flex items-center justify-center ${
        size === "big" ? "p-2.5 w-10 h-10" : "p-[5px] w-[26px] h-[26px]"
      } bg-slate-50`}
    >
      {children}
    </div>
  );
};

export default LogoMark;
