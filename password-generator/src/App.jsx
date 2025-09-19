import React, { useState } from 'react'
import { ArrowRight, Copy, LockKeyhole } from 'lucide-react'
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';

const App=() => {
  const patten="A9$vG3#kTq7&xP2!fM8@rH6%wL1^cJ4*eZ0oB5)uNQyDsVbRjKmXhCtFpWnLgSa"
  const [password, setPassword]=useState('')

  const generatePassword=(e) => {
    e.preventDefault()
    let p=''
    const len=e.target[0].value
    const pattenLenght=patten.length-1

    for (let i=0; i<len; i++) {
      const randomIndex=Math.floor(Math.random()*pattenLenght)
      p=p+patten[randomIndex]
    }
    setPassword(p)


  }

  const copyPassword = () => {
     navigator.clipboard.writeText(password)
     toast.success("Password Copyied!")
  }

  return (
    <>
      <div className='h-screen bg-gradient-to-tr from-slate-900 via-rose-900 to-slate-900 flex justify-center items-center'>
        <div className='flex flex-col items-center gap-3 animated__animated animate__bounceIn animated__faster cursor-pointer p-16 w-lg lg-white rounded-xl bg-gradient-to-r from-slate-700 via-rose-700 to-slate-700 border border-white/20 shadow-xl'>
          <LockKeyhole className='text-white w-12 h-12' />
          <h1 className='text-white text-3xl font-bold'>Password Generator</h1>
          <form className='w-full mt-6' onSubmit={generatePassword}>
            <input type="number" placeholder='Enter Password lenght' className='bg-black/10 p-3 rounded-lg border border-white/20 w-full text-white focus:outline-none' />
            <button className='bg-green-500 font-medium text-white hover:scale-105 duration-300 rounded-lg flex items-center py-3 w-full justify-center cursor-pointer mt-5'>
              <ArrowRight />
              Generate strong password
            </button>
          </form>
          {
            password!==''&&
            <div className='p-3 rounded-lg bg-black/20 text-white w-full flex items-center justify-between mt-4'>
              <p>{password}</p>
              <Copy className='w-4 h-4 hover:scale-115 duration-300 '  onClick={copyPassword}/>
            </div>
          }
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App