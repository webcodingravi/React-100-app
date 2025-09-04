import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import getYouTubeID from 'get-youtube-id'
import toast, { Toaster } from 'react-hot-toast';


const App=() => {
  const urlModel=[
    {
      width: 120,
      height: 90,
      url: 'https://img.youtube.com/vi',
      filename: 'default.jpg'
    },
    {
      width: 320,
      height: 180,
      url: 'https://img.youtube.com/vi',
      filename: 'mqdefault.jpg'
    },
    {
      width: 480,
      height: 360,
      url: 'https://img.youtube.com/vi',
      filename: 'hqdefault.jpg'
    },
    {
      width: 640,
      height: 480,
      url: 'https://img.youtube.com/vi',
      filename: 'sddefault.jpg'
    },
    {
      width: 1280,
      height: 720,
      url: 'https://img.youtube.com/vi',
      filename: 'maxresdefault.jpg'
    }
  ]
  const [url, setUrl]=useState('');
  const [thumbnails, setThumbnails]=useState([])

  const fetchThumbnail=(e) => {
    e.preventDefault();
    const videoId=getYouTubeID(url);
    if (videoId) {
      const model=urlModel.map((item) => {
        return {
          ...item,
          url: `${item.url}/${videoId}/${item.filename}`
        }
      })

      setThumbnails(model)
    } else {
      toast.error("Invalid video url")
    }


  }

  return (
    <>
      <div className='min-h-screen bg-slate-100 py-8'>
        <div className='flex flex-col items-center px-6'>
          <h1 className='font-bold text-4xl'>▶️ Youtube Thumbnail Download </h1>
          <form className='space-x-4 mt-8' onSubmit={fetchThumbnail}>
            <input type="url" className='bg-white p-3 rounded-lg md:w-[450px] focus:outline-none' placeholder='Enter youtube video url' required onChange={(e) => setUrl(e.target.value)} />
            <button className='px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium cursor-pointer mt-4 md:mt-0 focus:outline-none hover:bg-indigo-700'>
              <i className="ri-search-line mr-1"></i>
              Search
            </button>
          </form>
        </div>

        <div className='grid md:grid-cols-3 grid-cols-1 gap-12 w-10/12 mx-auto mt-18'>

          {
            thumbnails.map((item, index) => (
              <div key={index} className='bg-white rounded-lg'>
                <img src={item.url} className='w-full h-[250px] object-cover cursor-pointer rounded-t-xl' />
                <div className='p-3 bg-white rounded-b-xl'>
                  <h1 className='mb-4'>{item.width}x{item.height}</h1>

                  <a href={item.url} target='__blank'>
                    <button className='py-2 px-4 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600'>
                      <i className="ri-download-line mr-1"></i>
                      Download
                    </button>
                  </a>
                </div>
              </div>
            ))
          }


        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App