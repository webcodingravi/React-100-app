import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Download, Trash2, Upload } from "lucide-react"
import { useImageStore } from './zustand/useImageStore';

const FIVE_MB=(5*1024*1024)
const App=() => {
  const { images, setImage, deleteImage }=useImageStore();
  const chooseFile=(e) => {
    const input=e.target;
    const file=input.files[0];
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file")

    if (file.size>FIVE_MB)
      return toast.error("File size to large upload less than 5mb")

    const fileReader=new FileReader()
    fileReader.readAsDataURL(file);
    fileReader.onload=() => {
      setImage({
        id: Date.now(),
        name: file.name,
        size: file.size,
        binary: fileReader.result,
        createdAt: new Date()
      })
      toast.success("New image added")
    }

  }
  const downladImage=(item) => {
    const a=document.createElement("a")
    a.href=item.binary
    a.download=item.name
    a.click()
    a.remove();

  }
  return (
    <>
      <div className='bg-slate-100 min-h-screen'>
        <div className='md:w-9/12 mx-auto py-10 space-y-8 md:px-0 px-6'>
          <h1 className='text-center font-bold text-4xl'>Image Storage</h1>
          <button className='relative hover:scale-104 cursor-pointer transition-transform duration-300 hover:shadow-lg md:w-8/12 w-full mx-auto border-2 border-dashed flex flex-col items-center gap-3 text-white py-10 bg-[linear-gradient(290deg,_#00c6ff,_#0072ff)] rounded-xl'>
            <Upload className="w-16 h-16" />
            <h1 className='text-xl'>Click me to add an image</h1>
            <input type="file" className='absolute top-0 left-0 opacity-0 w-full h-full rounded-xl cursor-pointer' onChange={chooseFile} />
          </button>

          <div className='grid md:grid-cols-4 gap-4'>
            {
              images.map((item, index) => (
                <div className='overflow-hidden rounded-t-xl' key={index}>
                  <img src={item.binary} className='w-full h-[150px] object-cover rounded-t-xl hover:scale-105 transition-transform duration-300 cursor-pointer' />
                  <div className='bg-white p-3 rounded'>
                    <h1 className='font-semibold'>{item.name}</h1>
                    <p className='text-gray-500'>{((item.size/1024/1024).toFixed(1))}Mb</p>
                    <div className='mt-3 flex gap-3'>
                      <button className='w-8 h-8 bg-green-400 cursor-pointer rounded flex items-center justify-center text-white hover:bg-cyan-500 hover:scale-105 transition-transform duration-300'>
                        <Download className='w-4 h-4 ' onClick={() => downladImage(item)} />
                      </button>
                      <button className='w-8 h-8 bg-rose-400 cursor-pointer rounded flex items-center justify-center text-white hover:bg-pink-500 hover:scale-105 transition-transform duration-300' onClick={() => deleteImage(item.id)}>
                        <Trash2 className='w-4 h-4 ' />
                      </button>
                    </div>
                  </div>

                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App