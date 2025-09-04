import React, { useEffect, useState } from 'react'
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

const API_KEY="i6rAEHGuq1KZPjhQCYaUDQQYZviDahHre0f2cUQXVVXFQZBZmcPmurUE"

const App=() => {
  const [photo, setPhoto]=useState([]);
  const [loading, setLoading]=useState(false);
  const [page, setPage]=useState(1)
  const [Query, setQuery]=useState("nature");

  const fetchImage=async () => {
    try {
      setLoading(true)
      const options={
        headers: {
          Authorization: API_KEY
        }
      }
      const { data }=await axios.get(`https://api.pexels.com/v1/search?query=${Query}&page=${page}&per_page=12`, options)
      setPhoto([
        ...photo,
        ...data.photos
      ])

    } catch (err) {
      toast.error("Failed to fetch Images", err.message);
    }
    finally {
      setLoading(false)
    }
  }

  const loadMore=() => {
    setPage(page+1)
  }

  const search=(e) => {
    e.preventDefault();
    const q=e.target[0].value.trim();
    setPhoto([])
    setQuery(q)
  }

  useEffect(() => {
    fetchImage()
  }, [page, Query])
  return (
    <>

      <div className='min-h-screen bg-slate-100 animate__animated animate__fadeIn py-8'>
        <div className='md:w-10/12 pt-15 mx-auto md:px-0 px-6'>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='font-bold text-4xl mb-8 text-indigo-600'>📷 Image Gallery - {Query}</h1>
            <form onSubmit={search}>
              <input type="text" className='p-3 bg-white rounded-l-lg focus:outline-none md:w-[400px]' placeholder='Searh Image Here' />
              <button className='bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-500 p-3 md:px-8 focus:outline-none text-white rounded-r-lg cursor-pointer'>
                <i class="ri-search-line mr-2"></i>
                Search
              </button>
            </form>
          </div>
          {
            photo.length===0&&
            <h1 className='text-4xl font-bold text-center mt-8'>Search Result Not Found</h1>
          }
          <div className='grid md:grid-cols-4 grid-cols-1 gap-8 mt-8'>

            {
              photo.map((item, index) => (
                <div key={index} className='bg-white rounded-xl h-[330px] cursor-pointer overflow-hidden'>
                  <img src={item.src.medium} alt={item.alt} className='object-cover w-full h-[220px] rounded-t-lg hover:scale-102 transition-transform duration-300' />

                  <div className='p-3 text-center'>
                    <h1 className='text-lg font-medium capitlize text-gray-600'>{item.photographer}</h1>
                    <a target='__blank' href={item.src.original} className='block mt-2 bg-indigo-500 text-white py-3 px-5 hover:bg-indigo-600 hover:scale-102 transition-transform duration-300 rounded-xl'>
                      <i className="ri-download-line mr-1"> </i>
                      Download

                    </a>
                  </div>
                </div>
              ))
            }

          </div>

          {
            loading&&
            <div className='flex items-center justify-center'>
              <i class="ri-loader-2-line text-4xl animate-spin text-gray-400"></i>

            </div>
          }


          {
            photo.length>0&&

            <div className='flex items-center justify-center mt-20'>
              <button onClick={loadMore} className='bg-indigo-700 py-3 px-16 rounded-lg font-medium text-white hover:bg-indigo-800 hover:scale-102 transition-transform duration-300 cursor-pointer'>Load More ... </button>
            </div>

          }

        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App