import React, { useState } from 'react'
import 'animate.css';
import { Send } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import moment from 'moment'

const API_KEY="AIzaSyCZ6jFdr7PeWrfRKrpAA5mVYhg27-7XX3Y"

const App=() => {
    const [message, setMessage]=useState('')
    const [chats, setChats]=useState([]);
    const [isTyping, setTyping]=useState(false)

    const createChat=async (e) => {
        try {
            e.preventDefault();
            setChats((prev) => [...prev,
            {
                sender: "me",
                message: message,
                createdAt: new Date()
            }
            ])
            setMessage('')

            setTyping(true)
            const payload={
                contents: {
                    parts: {
                        text: message
                    }
                }
            }
            // Answer this in short

            const options={
                headers: {
                    "X-goog-api-key": API_KEY
                }
            }

            const { data }=await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", payload, options)
            const aiResult=data.candidates[0].content.parts[0].text
            setChats((prev) => [...prev,
            {
                sender: "ai",
                message: aiResult,
                createdAt: new Date()
            }
            ])




        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setTyping(false)
        }
    }
    return (
        <>
            <div className='bg-white min-h-screen'>
                <div className='w-full mx-auto bg-[url(background.jpg)] min-h-screen pt-12 pb-48'>
                    <h1 className='text-3xl font-bold text-center'>
                        🤖 AI CHAT
                    </h1>

                    <div className='py-8 md:px-8 px-4 space-y-6'>
                        {
                            chats.map((item, index) => (
                                <div key={index}>
                                    {
                                        item.sender==="me"&&
                                        <div className='flex justify-start animate__animated animate__fadeIn'>
                                            <div className='bg-rose-200 text-rose-950 font-medium px-6 py-3 rounded-xl w-fit'>
                                                {item.message}
                                                <div className='flex justify-end text-gray-900 text-xs pt-4'>
                                                    <label>{moment(item.createdAt).format('MMM DD YYYY, hh:mm:ss A')}</label>
                                                </div>
                                            </div>

                                        </div>

                                    }

                                    {
                                        item.sender==="ai"&&
                                        <div className='gap-2 animate__animated animate__fadeIn max-w-3xl'>

                                            <div className='bg-green-200 text-green-950 font-medium px-6 py-3 rounded-xl w-fit'>
                                                {item.message}
                                                <div className='flex justify-end text-gray-900 text-xs pt-4'>
                                                    <label>{moment(item.createdAt).format('MMM DD YYYY, hh:mm:ss A')}</label>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            ))
                        }


                    </div>
                    {
                        isTyping&&
                        <div className='flex justify-end px-8'>
                            <small className='text-gray-500 text-sm font-medium animate__animated animate__fadeIn'>Typing...</small>
                        </div>
                    }


                    <div className='px-4 md:px-8 pb-5 fixed bottom-0 w-full bg-[url(background.jpg)]'>
                        <form className='relative shadow-md backdrop-blur-md' onSubmit={createChat}>
                            <input type="text" value={message} placeholder='Chat with AI from here' className='bg-white w-full py-6 pl-6 pr-17 focus:outline-none rounded-full ' onChange={(e) => setMessage(e.target.value)} />
                            <button className='focus:outline-none bg-green-600 rounded-full text-white flex items-center justify-center cursor-pointer h-12 w-12 absolute top-3 right-4 hover:bg-green-700'>
                                <Send />
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <Toaster />
        </>
    )
}

export default App