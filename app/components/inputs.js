export const Input = ({
  Icon,
  type,
  name,
  value,
  placeholder,
  pattern,
  max,
  doOnInput,
  customClass,
  messageIfError,
  customElements,
}) => {
  return (
    <div className="w-full">
      <div
        className={
          "bg-app-filter-blue border max-sm:w-full md:min-w-[300px]  px-4 py-3 rounded-lg flex items-center h-fit  hover:border-app-dark-blue focus-within:border-app-dark-blue " +
          customClass +
          (messageIfError ? " border-[red] " : " border-trasparent ")
        }
      >
        {/* {choosen ? <span className="text-[10px]">{placeholder}</span> : ""} */}
        <div className="m-0 w-full flex items-center gap-2">
          {Icon}
          <input
            type={type || "text"}
            name={name}
            max={max || ""}
            value={value}
            pattern={pattern}
            placeholder={placeholder}
            onChange={(e) => {
              doOnInput(e.target.value);
            }}
            className={
              "w-full h-full text-black p-0 outline-none bg-transparent text-sm dark:text-white dark:placeholder-gray-400 appearance-none"
            }
          />
          {customElements}
        </div>
      </div>
      {messageIfError ? (
        <span className="block text-[red] text-left relative h-0 left-5 text-[11px]">
          {messageIfError}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
