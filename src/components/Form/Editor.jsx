import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const quill = {
  format: ["video","image","link","blockquote","bold","italic","underline","list","strike","header"],
  modules: {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  }
}
const Editor = ({ ...props }) => {
  return (
    <ReactQuill format={quill.format} modules={quill.modules} {...props} />
  )
}

export default Editor
