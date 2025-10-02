import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import 'animate.css';
import { ReactPhotoEditor } from 'react-photo-editor'

const App=() => {
  const [file, setFile]=useState(null)
  const [open, setOpen]=useState(false)
  const chooseImage=() => {
    const input=document.createElement("input")
    input.type="file"
    input.accept="image/*"
    input.click()
    input.onchange=() => {
      const file=input.files[0]
      console.log(file)
      console.log(file)
      setFile(file)
      setOpen(true)

    }

  }

  const handleClose=() => {
    setOpen(false)
    setFile(null)
  }

  const onSave=(editedPhoto) => {
    const url=URL.createObjectURL(editedPhoto)
    const a=document.createElement("a")
    a.href=url;
    a.download="sample.png"
    a.click()
  }

  return (
    <>
      <div className='animate__animated animate__fadeIn h-screen flex items-center justify-center bg-[linear-gradient(102deg,_#00c6ff,_#0072ff)]'>
        <div onClick={chooseImage} className='active:scale-80 bg-white shadow-lg w-lg p-8 rounded-xl hover:scale-120 duration-300 flex items-center justify-center flex-col cursor-pointer'>
          <Upload className="w-16 h-16" />
          <h1 className='text-4xl font-bold'>Choose an image</h1>
        </div>
        <ReactPhotoEditor open={open} file={file} onClose={handleClose} onSaveImage={onSave} />
      </div>

    </>
  )
}

export default App