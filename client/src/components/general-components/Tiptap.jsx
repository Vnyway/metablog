import React, { useContext } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { GlobalContext } from "../../context/globalContext";

const Tiptap = ({ desc, onChange }) => {
  const { darkTheme } = useContext(GlobalContext);
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: desc,
    editorProps: {
      attributes: {
        class: "border-[1px] min-h-[150px] px-[12px] py-[5px] outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="editor flex flex-col gap-[8px] min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent
        style={{ transition: "all ease-in-out .3s" }}
        className={`${
          darkTheme ? "text-[#FFFFFF]" : "text-[#000000]"
        } text-[18px]`}
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
