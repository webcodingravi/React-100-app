import { ArrowBigRight, Plus } from 'lucide-react'
import React, { useState } from 'react'

const App=() => {
  const [src, setSrc]=useState('/sample.jpg')
  const [suggestedHeight, setSuggestedHeight]=useState(0)
  const [suggestedWidth, setSuggestedWidth]=useState(0)

  const [original, setOrignial]=useState({
    width: 0,
    height: 0
  })


  const chooseImage=() => {
    const input=document.createElement("input")
    input.type="file"
    input.accept="image/*"
    input.click()
    input.onchange=() => {
      const file=input.files[0]
      const url=URL.createObjectURL(file)
      setSrc(url)
      const image=new Image()
      image.src=url
      image.onload=() => {
        setOrignial({
          width: image.width,
          height: image.height
        })
      }
    }
  }

  const findHeight=(e) => {
    e.preventDefault();
    const width=e.target[0].value
    const height=(width*original.height)/original.width
    setSuggestedHeight(Math.round(height))
  }

  const findWidth=(e) => {
    e.preventDefault()
    const height=e.target[0].value
    const width=(height*original.width)/original.height
    setSuggestedWidth(Math.round(width))
  }
  return (
    <>
      <div className='bg-slate-200 min-h-screen'>
        <div className='w-9/12 mx-auto py-16'>
          <button onClick={chooseImage} className='cursor-pointer mb-6 bg-indigo-600 text-white font-medium px-12 py-3 rounded-lg flex items-center gap-1 hover:scale-105 transition-transform duration-300'>
            <Plus className='w-5 h-5' />
            Add Image
          </button>
          <div className='flex flex-col gap-8'>
            <div className='bg-white rounded-xl p-8 flex justify-center'>
              <img src={src} className='w-[40%]' />
            </div>
            <div className='bg-white rounded-xl p-8 grid grid-cols-2 gap-12'>
              <div >
                <h1 className='bg-rose-500 py-3 px-4 font-bold text-lg text-white w-fit mb-3'>Height Finder</h1>
                <form onSubmit={findHeight}>
                  <input type="number" name='width' className='border border-gray-300 rounded p-3 focus:outline-none' placeholder='width' required />
                  <button className='bg-indigo-600 text-white flex items-center gap-1 p-2 rounded mt-3 cursor-pointer'>
                    <ArrowBigRight />
                    Find
                  </button>
                </form>
                <h1 className='mt-4 text-xl font-bold'>Height Suggestion : {suggestedHeight}</h1>
              </div>
              <div >
                <h1 className='bg-green-500 py-3 px-4 font-bold text-lg text-white w-fit mb-3'>Width Finder</h1>
                <form onSubmit={findWidth}>
                  <input type="number" name='height' className='border border-gray-300 rounded p-3 focus:outline-none' placeholder='Height' required />
                  <button className='bg-indigo-600 text-white flex items-center gap-1 p-2 rounded mt-3 cursor-pointer'>
                    <ArrowBigRight />
                    Find
                  </button>
                </form>
                <h1 className='mt-4 text-xl font-bold'>Width Suggestion : {suggestedWidth}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App