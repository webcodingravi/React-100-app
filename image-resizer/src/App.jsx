import React, { createElement, useState } from 'react'
import { ImageUpscale, ImageDown, Download } from 'lucide-react'

const App=() => {
  const [originalImage, setOrignalImage]=useState('/sample.png')
  const [resizedImage, setResizedImage]=useState('/sample.png')
  const [form, setForm]=useState({
    width: '',
    height: ''
  })
  const showImage=(e) => {
    const input=e.target
    const file=input.files[0]
    const url=URL.createObjectURL(file)
    setOrignalImage(url)

  }

  const handleChange=(e) => {
    const input=e.target
    const name=input.name
    const value=input.value
    setForm({
      ...form,
      [name]: value
    })


  }
  const resizeImage=(e) => {
    e.preventDefault();
    const image=new Image()
    image.src=originalImage
    image.onload=() => {
      const canvas=document.createElement("canvas")
      const targetWidth=Number(form.width)
      const targetHeight=Number(form.height)
      canvas.width=Number(form.width)
      canvas.height=Number(form.height)
      const ctx=canvas.getContext("2d")
      ctx.imageSmoothingEnabled=true
      ctx.imageSmoothingQuality="high"
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight)
      const imageString=canvas.toDataURL("image/png", 0.92)
      setResizedImage(imageString)

    }

  }

  const DownloadImage=(item) => {
    const a=document.createElement('a');
    a.href=item; // base64 string works directly
    a.download=Date.now()+".png"; // filename
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <div className='bg-gray-200 min-h-screen py-12'>
        <div className='mx-auto md:w-10/12 bg-white rounded-xl p-8 md:grid grid-cols-2 gap-12'>
          <div className='space-y-6'>
            <h1 className='text-2xl font-bold'>Image Resizer</h1>
            <div className='relative h-[500px] bg-slate-900 rounded-lg'>
              <img src={originalImage} alt="image" className='rounded-lg object-contain w-full h-full' />
              <input type="file" onChange={showImage} className='absolute top-0 left-0 w-full h-full opacity-0 rounded-lg cursor-pointer' accept='image/*' />
            </div>
            <div>
              <form className='flex md:flex-row flex-col gap-4' onSubmit={resizeImage}>
                <input type="number" onChange={handleChange} name='width' placeholder='width' disabled={originalImage==="/sample.png"} className='border border-gray-300 p-2 rounded focus:outline-none' />

                <input type="number" onChange={handleChange} name='height' placeholder='height' disabled={originalImage==="/sample.png"} className='border border-gray-300 p-2 rounded focus:outline-none' />

                <button disabled={originalImage==="/sample.png"} className='flex gap-2 bg-indigo-600 text-white font-medium py-2 px-8 rounded hover:bg-green-500 duration-300 hover:scale-105 transition-transform cursor-pointer'>
                  <ImageUpscale />
                  Resize</button>

              </form>
            </div>
          </div>

          <div className='space-y-6 mt-8 md:mt-0'>
            <h1 className='text-2xl font-bold'>Result</h1>
            <div className='h-[500px] bg-slate-900 rounded-lg flex items-center justify-center overflow-auto'>
              <img src={resizedImage} alt="image" className='rounded-lg' style={{ height: form.width, height: form.height }} />



            </div>

            {
              resizedImage=="/sample.png"? '':
                <div className='flex justify-center'>
                  <button onClick={() => DownloadImage(resizedImage)} className='bg-rose-600 text-white font-medium py-2 px-8 rounded hover:bg-green-500 duration-300 hover:scale-105 transition-transform cursor-pointer flex gap-2'>
                    <ImageDown />Downlaod</button>
                </div>
            }


          </div>

        </div>
      </div>
    </>
  )
}

export default App