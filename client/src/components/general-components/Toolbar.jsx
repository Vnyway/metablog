import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

const ButtonWrapper = ({ onClick, label, children }) => (
  <button
    type="button"
    style={{ transition: "all ease-out .3s" }}
    className={`border-[1px] p-[5px] rounded-[4px] bg-[#FFFFFF00] bg-opacity-0 hover:bg-[#b6b6bb] hover:bg-opacity-20`}
    onClick={onClick}
    aria-label={label}>
    {children}
  </button>
);

const Toolbar = ({ editor }) => {
  const { darkTheme } = useContext(GlobalContext);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent min-h-[60px] flex gap-[12px] items-center px-[12px]">
      <ButtonWrapper
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="Bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none">
          <g id="Edit / Bold">
            <path
              d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
              style={{ transition: "all ease-in-out .3s" }}
              stroke={darkTheme ? "#FFFFFF" : "#000000"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </ButtonWrapper>
      <ButtonWrapper
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="Italic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none">
          <path
            id="Vector"
            d="M8 19H10M10 19H12M10 19L14 5M12 5H14M14 5H16"
            style={{ transition: "all ease-in-out .3s" }}
            stroke={darkTheme ? "#FFFFFF" : "#000000"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ButtonWrapper>
      <ButtonWrapper
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="Bullet List">
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
          <path
            id="Vector"
            d="M9 17H19M9 12H19M9 7H19M5.00195 17V17.002L5 17.002V17H5.00195ZM5.00195 12V12.002L5 12.002V12H5.00195ZM5.00195 7V7.002L5 7.00195V7H5.00195Z"
            style={{ transition: "all ease-in-out .3s" }}
            stroke={darkTheme ? "#FFFFFF" : "#000000"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ButtonWrapper>
      <ButtonWrapper
        className="h-4 w-4"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none">
          <path
            id="Vector"
            d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
            style={{ transition: "all ease-in-out .3s" }}
            stroke={darkTheme ? "#FFFFFF" : "#000000"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ButtonWrapper>
      <ButtonWrapper
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="Heading 2">
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
          <path
            id="Vector"
            d="M15 12.5V12C15 10.3431 16.3431 9 18 9H18.1716C19.7337 9 20.9996 10.2665 20.9996 11.8286C20.9996 12.5788 20.702 13.2982 20.1716 13.8286L15 19.0002L21 19M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19"
            style={{ transition: "all ease-in-out .3s" }}
            stroke={darkTheme ? "#FFFFFF" : "#000000"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ButtonWrapper>
    </div>
  );
};

export default Toolbar;
