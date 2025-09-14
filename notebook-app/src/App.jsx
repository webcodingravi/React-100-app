import React, { useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Edit2, Plus, Trash2, File } from 'lucide-react'
import { Divider, Form, Modal, Input, Button, message, Empty } from 'antd'
import { nanoid } from 'nanoid'
import { useNote } from './zustand/useNote';
import moment from 'moment'

const App=() => {
    const [form]=Form.useForm();
    const [open, setOpen]=useState(false)
    const [editId, seteditId]=useState(null)
    const [read, setRead]=useState(null)
    const { notes, setNote, deleteNote, updateNote }=useNote()

    const createNote=(values) => {
        values.id=nanoid()
        values.date=new Date()
        setNote(values)
        handleClose()
        message.success("Note Successfully Created!")
    }

    const editNote=(item) => {
        seteditId(item.id)
        setOpen(true)
        form.setFieldsValue(item)
    }

    const saveNote=(values) => {
        values.date=new Date()
        updateNote(editId, values)
        setRead(values)
        handleClose()
        message.success("Note Successfully Updated!")

    }

    const handleClose=() => {
        setOpen(false)
        form.resetFields()
        seteditId(null)
    }

    const removeNote=(id) => {
        deleteNote(id)
        setRead(null)
        message.success("Note Successfully Deleted!")

    }





    return (
        <>
            <div className='min-h-screen bg-slate-200'>
                <aside className='overflow-auto space-y-6 px-4 p-8 bg-[linear-gradient(119deg,_#00c6ff,_#0072ff,_hsl(282.6,_68.20992083107859%,_40.096549073744065%))] fixed top-0 left-0 w-[300px] h-full'>


                    <div className='bg-white p-3 rounded-lg space-y-6'>
                        {
                            notes.map((item, index) => (
                                <button onClick={() => setRead(item)} key={index} className='flex items-star4 gap-1 hover:bg-slate-100 w-full hover:p-3 duration-300 hover:cursor-pointer'>
                                    <File className='w-4 h-4 mt-[5px]' />
                                    <div className='flex flex-col'>
                                        <label className='font-medium text-black/80 text-left capitalize'>{item.filename}</label>
                                        <label className='text-xs text-slate-500 text-left'>{moment(item.date).format("DD MMM YYYY, hh:mm A")}</label>
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                    <button onClick={() => setOpen(true)} className='cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center gap-1 bg-rose-500 text-white font-medium w-full py-3 justify-center rounded-lg'>
                        <Plus />
                        New File
                    </button>
                </aside>
                <section className='ml-[300px] py-12'>
                    {
                        read?

                            <div className='w-10/12 mx-auto bg-white rounded-xl'>
                                <div className='px-6 py-6 border-b border-slate-300 border-dashed flex justify-between items-center'>
                                    <div>
                                        <h1 className='text-lg font-medium capitalize'>{read.filename}</h1>
                                        <label className='text-slate-500 text-xs'>{moment(read.date).format("DD MMM YYYY, hh:mm A")}</label>
                                    </div>

                                    <div className='space-x-3'>
                                        <button onClick={() => editNote(read)} className='bg-green-500 p-2 rounded text-white hover:bg-green-600 cursor-pointer hover:scale-105 transition-transform duration-300'>
                                            <Edit2 className='w-3 h-3' />
                                        </button>
                                        <button onClick={() => removeNote(read.id)} className='bg-rose-500 p-2 rounded text-white hover:bg-rose-600 cursor-pointer hover:scale-105 transition-transform duration-300'>
                                            <Trash2 className='w-3 h-3' />
                                        </button>
                                    </div>
                                </div>
                                <div className='p-6'>
                                    <p className='text-gray-500'>{read.content}</p>
                                </div>
                            </div>

                            :

                            <div className='w-10/12 mx-auto bg-white rounded-xl p-16 flex items-center justify-center'>
                                <Empty description="Choose a file to read" />
                            </div>
                    }
                </section>

                <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false} width={"70%"}>
                    <h1 className='text-semibold text-xl'>Create a new file</h1>
                    <Divider />
                    <Form layout='vertical' form={form} onFinish={editId? saveNote:createNote}>
                        <Form.Item label="Filename" name="filename" rules={[{ required: true }]}>
                            <Input size="large" placeholder="Enter file name" />
                        </Form.Item>

                        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
                            <Input.TextArea size="large" placeholder="Content goes here..." rows={10} />
                        </Form.Item>

                        <Form.Item>
                            {
                                editId?
                                    <Button size='large' type="primary" htmlType="submit" danger>Save</Button>
                                    :
                                    <Button size='large' type="primary" htmlType="submit">Submit</Button>
                            }

                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        </>
    )
}

export default App