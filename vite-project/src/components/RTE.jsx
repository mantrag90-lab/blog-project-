import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 inline-block text-sm font-semibold text-stone-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key'}
            value={value || ""}
            init={{
              height: 400,
              menubar: true,
              plugins: "lists link image code table wordcount preview fullscreen",
              toolbar: "undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | link image table | code fullscreen preview",
              content_style: "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; }",
              skin: "oxide",
              branding: false,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}
