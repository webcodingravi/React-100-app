import React, { useState } from 'react'
import { Languages, Copy, LoaderCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"

const API_KEY="AIzaSyCZ6jFdr7PeWrfRKrpAA5mVYhg27-7XX3Y";


const App=() => {
  const [form, setForm]=useState({
    text: '',
    lang: ''
  })
  const [result, setResult]=useState("Your translated result goes here...")
  const [loading, setLoading]=useState(false)

  const translateNow=async (e) => {
    e.preventDefault()
    if (form.lang===''||form.lang==='Choose language<') {
      toast.error("Please choose a language")
      return
    }

    try {

      setLoading(true)
      const payload={
        contents: [{
          parts: [{
            text: `Translate into ${form.lang} (Translation as it is no any other data like hint description or any symbold) - ${form.text}`
          }]
        }]
      }

      const options={
        headers: {
          'X-goog-api-key': API_KEY
        }
      }
      const { data }=await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", payload, options)
      const answer=data.candidates[0].content.parts[0].text
      setResult(answer)
    }
    catch (err) {
      toast.error(err.message)
    }

    finally {
      setLoading(false)
    }
  }

  const copy=() => {
    navigator.clipboard.writeText(result)
    toast.success("Content copyied!")
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
  return (
    <>
      <div className='min-h-screen bg-slate-900 py-16'>
        <div className='w-10/12 grid md:grid-cols-2 gap-12 mx-auto'>
          <div className='p-8 bg-slate-800 border-2 border-slate-700 rounded-xl'>
            <h1 className='text-4xl font-bold text-amber-500 mb-6'>Translator</h1>
            <form className='space-y-6' onSubmit={translateNow}>
              <textarea name='text' placeholder='Your content goes here...' onChange={handleChange} className='text-white bg-slate-900 w-full rounded-xl focus:outline-none p-3 border-2 border-amber-500 placeholder-amber-200' rows={5} required>

              </textarea>
              <select name='lang' onChange={handleChange} className='text-white bg-slate-900 w-full rounded-xl focus:outline-none p-3 border-2 border-amber-500 placeholder-amber-200' required>
                <option>Choose language</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
              {
                loading?
                  <button disabled className='flex items-center gap-1 bg-gray-200 rounded-lg text-white py-3 px-6 font-medium focus:scale-90 duration-100 cursor-pointer'>
                    <LoaderCircle className='animate-spin' />
                    Loading
                  </button>
                  :

                  <button className='flex items-center gap-1 bg-amber-500 rounded-lg text-white py-3 px-6 font-medium focus:scale-90 duration-100 cursor-pointer'>
                    <Languages />
                    Translate
                  </button>


              }



            </form>
          </div>
          <div className='relative p-8 bg-slate-800 border-2 border-slate-700 rounded-xl'>
            <p className='mt-5 text-white'>{result}</p>
            <Copy onClick={copy} className='absolute top-5 right-5 text-white hover:scale-105 duration-300 cursor-pointer' />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App