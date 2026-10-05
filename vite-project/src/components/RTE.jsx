import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue = ""}) {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY?.trim();

  return (
    <div className="w-full">
      {label && <label className="mb-2 inline-block text-sm font-semibold text-stone-700">{label}</label>}
      {!apiKey ? (
        <p role="alert" className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          The rich text editor is not configured. Add <code>VITE_TINYMCE_API_KEY</code> to the deployment environment and rebuild the app.
        </p>
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={apiKey}
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
      )}
    </div>
  )
}
