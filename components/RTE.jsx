import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name = "content", control, label = "Content", defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="0cskuvxe521lbdi0g93d7te8k3inypoty15x26is1myof2nz"
            value={value || ""}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "anchor", "autolink", "charmap", "codesample", "emoticons",
                "link", "lists", "media", "searchreplace", "table",
                "visualblocks", "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | removeformat",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
