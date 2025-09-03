// src/template/TemplateEditor.jsx
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TemplateEditor({ initialContent, onChange }) {
  return (
    <Editor
      apiKey="itsnpemd3o6l53whdkpl1oz6u7v0u8d3ic638j5cwpgggn5t"
      value={initialContent}
      init={{
        height: 600,
        menubar: "file edit view insert format tools table help",
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table code help wordcount",
          "emoticons hr pagebreak visualchars nonbreaking",
        ],
        toolbar: `
          undo redo | blocks | bold italic underline strikethrough |
          forecolor backcolor | fontselect fontsizeselect | 
          alignleft aligncenter alignright alignjustify | 
          bullist numlist outdent indent | 
          link image media | table | emoticons charmap | 
          hr pagebreak blockquote | code preview fullscreen
        `,
        block_formats:
          "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3",
        image_caption: true,
        image_advtab: true,
        table_default_attributes: { border: "1" },
        table_default_styles: {
          width: "100%",
          borderCollapse: "collapse",
        },
        content_style: `
          body { font-family: Arial, sans-serif; font-size:14px; line-height:1.6; }
          h1,h2,h3 { color: #333; }
          a { color: #4A90E2; text-decoration: none; }
          table, th, td { border: 1px solid #ccc; padding: 8px; }
          img, video { max-width: 100%; height: auto; }
          .button { background:#4A90E2;color:#fff;padding:10px 20px;border-radius:5px;display:inline-block;text-decoration:none; }
        `,
        automatic_uploads: true,
        file_picker_types: "image media file",

        // Custom file picker
        file_picker_callback: (callback, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");

          if (meta.filetype === "image") {
            input.setAttribute("accept", "image/*");
          } else if (meta.filetype === "media") {
            input.setAttribute("accept", "video/*,audio/*");
          } else {
            input.setAttribute("accept", "*/*");
          }

          input.onchange = function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function () {
              const blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              const id = "blobid" + new Date().getTime();
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, reader.result);
              blobCache.add(blobInfo);

              if (meta.filetype === "image") {
                callback(blobInfo.blobUri(), { title: file.name });
              } else if (meta.filetype === "media") {
                callback(blobInfo.blobUri(), { source: file.name });
              } else {
                callback(blobInfo.blobUri(), { text: file.name });
              }
            };

            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
}
