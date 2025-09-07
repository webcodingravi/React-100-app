import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import toast, { Toaster } from 'react-hot-toast';
import { Badge, Button, Card, Empty, Form, Input, Modal, Popconfirm, Select, Tag } from 'antd';
import { Delete, Edit, Plus } from 'lucide-react'
import { useState } from 'react';
import { useEffect } from 'react';
import { usePlanner } from '../store/usePlanner';
import moment from 'moment'


const App=() => {
  const [form]=Form.useForm();
  const [open, setOpen]=useState(false);
  const [timer, setTimer]=useState(new Date().toLocaleTimeString())
  const [createdAt, setCreatedAt]=useState('')
  const [editId, setEditId]=useState(null)
  const { tasks, filterTasks, addTask, deleteTask, updateStatus, deleteAllTask, dateSearch, updateTasks }=usePlanner();


  //get data edit
  const editTask=(task) => {
    console.log(task)
    setCreatedAt(task.createdAt)
    setEditId(task.id);
    form.setFieldsValue({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  }

  // update
  const updateTask=(value) => {
    value.createdAt=createdAt;
    value.status="pending"
    updateTasks(value)
    handleClose()
    toast.success("Task updated Successfully")

  }



  const highestTasks=filterTasks.filter((item) => item.priority==="highest")
  const mediumTasks=filterTasks.filter((item) => item.priority==="medium")
  const lowestTasks=filterTasks.filter((item) => item.priority==="lowest")



  const createTask=(value) => {
    value.status="pending"
    value.id=Date.now()
    value.createdAt=createdAt;
    addTask(value)
    handleClose()
    toast.success("Task Created Successfully")
  }

  const handleClose=() => {
    setOpen(false)
    form.resetFields()
  }

  useEffect(() => {
    const interval=setInterval(() => {
      setTimer(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <>
      <div className='bg-slate-200 h-screen overflow-hidden'>
        <nav className='md:h-[70px] h-[170px] fixed top-0 left-0 w-full bg-gradient-to-r from-rose-900 via-slate-800 to-slate-900 md:flex justify-between items-center px-8'>
          <div className='flex items-center justify-center md:mt-0 mt-3'>
            <button className='text-white w-11 h-11 bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(266.9,_64.31201495900733%,_48.60745668223236%)_100%)] rounded-full font-bold text-bold'>
              Task
            </button>
            <h1 className='text-2xl font-bold ml-1 text-white'>Planner</h1>
          </div>
          <div className='flex md:flex-row flex-col gap-4 items-center justify-between md:mt-0 mt-3'>
            <h1 className='text-2xl font-bold text-white md:block hidden'>{timer}</h1>

            {/* <DatePicker size='large' /> */}
            <input type="date" className='cursor-pointer p-2 rounded-xl bg-white focus:outline-none' onChange={(e) => dateSearch(e.target.value)} />
            <div className='flex gap-5'>
              <button onClick={() => setOpen(true)} className='text-sm  px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 flex gap-1 font-medium items-center py-2 hover:scale-105 transition-translate duration-300 focus:shadow-lg cursor-pointer text-white'>
                <Plus className='w-4 h-4' />
                Add Task
              </button>
              <Popconfirm title="Do you want to delete all tasks ?" onConfirm={() => deleteAllTask()}>
                <button className='text-sm  px-3 rounded bg-gradient-to-tr from-rose-600 via-red-500 to-rose-600 flex gap-1 font-medium items-center py-2 hover:scale-105 transition-translate duration-300 focus:shadow-lg cursor-pointer text-white'>
                  <Delete className='w-4 h-4' />
                  Delete all Tasks
                </button>
              </Popconfirm>
            </div>
          </div>
        </nav>

        <section className='fixed md:top-[60px] top-[170px] left-0 md:h-[calc(100%-130px)] h-[calc(100%-240px)] w-full overflow-x-auto overflow-y-visible grid md:grid-cols-3 gap-8 p-8'>
          <div className='md:h-full md:min-h-0 h-[300px]'>
            <Badge.Ribbon text="Highest" className='!bg-gradient-to-br !from-rose-500 !via-pink-500 !to-rose-500 !font-medium z-99' />

            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto text-white p-6 space-y-8'>
              <div>

                {
                  highestTasks.length===0&&
                  (
                    <>

                      <Empty description="There is not task added as highest priority" />
                      <button onClick={() => setOpen(true)} className='text-sm  px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 flex gap-1 font-medium items-center mx-auto py-2 hover:scale-105 transition-translate duration-300 focus:shadow-lg cursor-pointer text-white mt-7'>
                        <Plus className='w-4 h-4' />
                        Add Task
                      </button>
                    </>
                  )

                }
                {
                  highestTasks.map((item, index) => (
                    <Card hoverable className='!my-6' key={index}>
                      <Card.Meta title={item.title} description={item.description} />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status==="pending"&&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status==="inProgress"&&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }

                          {
                            item.status==="completed"&&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }

                          <Popconfirm title="Do you want to delete all tasks ?" onConfirm={() => deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>
                        <div className='flex gap-3 items-center'>
                          <Edit size={16} className='text-gray-600' onClick={() => { setOpen(true), editTask(item) }} />
                          <Select size='small' placeholder="Change Status" onChange={(status) => updateStatus(item.id, status)}>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="inProgress">inProgress</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>

                          </Select>
                        </div>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                    </Card>

                  ))
                }
              </div>

            </div>

          </div>


          <div className='md:h-full md:min-h-0 h-[300px]'>
            <Badge.Ribbon text="Medium" className='!bg-gradient-to-br !from-indigo-500 !via-blue-500 !to-indigo-500 !font-medium z-99' />

            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto text-white p-6 space-y-8'>

              <div>
                {
                  mediumTasks.length===0&&
                  (
                    <>

                      <Empty description="There is not task added as Medium priority" />
                      <button onClick={() => setOpen(true)} className='text-sm py-1 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 flex gap-1 font-medium items-center mx-auto py-2 hover:scale-105 transition-translate duration-300 focus:shadow-lg cursor-pointer text-white mt-7'>
                        <Plus className='w-4 h-4' />
                        Add Task
                      </button>
                    </>
                  )

                }
                {
                  mediumTasks.map((item, index) => (
                    <Card hoverable className='!my-6' key={index}>
                      <Card.Meta title={item.title} description={item.description} />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status==="pending"&&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status==="inProgress"&&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }

                          {
                            item.status==="completed"&&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }

                          <Popconfirm title="Do you want to delete all tasks ?" onConfirm={() => deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>

                        <div className='flex gap-3 items-center'>
                          <Edit size={16} className='text-gray-600' onClick={() => { setOpen(true), editTask(item) }} />
                          <Select size='small' placeholder="Change Status" onChange={(status) => updateStatus(item.id, status)}>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="inProgress">inProgress</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>

                          </Select>
                        </div>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>

                    </Card>

                  ))
                }
              </div>

            </div>

          </div>


          <div className='md:h-full md:min-h-0 h-[300px]'>
            <Badge.Ribbon text="Lowest" className='!bg-gradient-to-br !from-amber-500 !via-orange-500 !to-amber-500 !font-medium z-99' />

            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto text-white p-6 space-y-8'>

              <div>
                {
                  lowestTasks.length===0&&
                  (
                    <>

                      <Empty description="There is not task added as Lowest priority" />
                      <button onClick={() => setOpen(true)} className='text-sm py-1 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 flex gap-1 font-medium items-center mx-auto py-2 hover:scale-105 transition-translate duration-300 focus:shadow-lg cursor-pointer text-white mt-7'>
                        <Plus className='w-4 h-4' />
                        Add Task
                      </button>


                    </>
                  )

                }
                {
                  lowestTasks.map((item, index) => (
                    <Card hoverable className='!my-6' key={index}>
                      <Card.Meta title={item.title} description={item.description} />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status==="pending"&&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status==="inProgress"&&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }

                          {
                            item.status==="completed"&&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }

                          <Popconfirm title="Do you want to delete all tasks ?" onConfirm={() => deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>
                        <div className='flex gap-3 items-center'>
                          <Edit size={16} className='text-gray-600' onClick={() => { setOpen(true), editTask(item) }} />
                          <Select size='small' placeholder="Change Status" onChange={(status) => updateStatus(item.id, status)}>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="inProgress">inProgress</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>

                          </Select>
                        </div>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>

                    </Card>

                  ))
                }
              </div>
            </div>

          </div>
        </section>

        <footer className='md:py-0  md:h-[60px] h-[70px] py-3 fixed bottom-0 left-0 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-rose-900 flex md:flex-row flex-col items-center justify-between px-8' >
          <div className='flex gap-3'>
            <h1 className='text-xl font-bold text-white'>Total Tasks - {filterTasks.length}</h1>

          </div>
          <a href="https://rkdesigner.epizy.com/" className='text-white hover:underline'>wwww.rkdesigner.epizy.com</a>
        </footer>
        <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
          <h1 className='text-lg font-medium mb-4'>New Task</h1>
          <Form onFinish={editId? updateTask:createTask} form={form}>
            <Form.Item name="id" size="large" hidden>
              <Input />
            </Form.Item>

            <Form.Item name="title" size="large" rules={[{ required: true }]} >
              <Input placeholder='Task name' />
            </Form.Item>

            <Form.Item name="description" rules={[{ required: true }]} >
              <Input.TextArea rows={5} placeholder='Task description goes here' />
            </Form.Item>

            <Form.Item name="priority" rules={[{ required: true }]} >
              <Select size='large' placeholder="Choose Priority">
                <Select.Option value="highest">Highest</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="lowest">Lowest</Select.Option>
              </Select>
            </Form.Item>

            <input type="date" name='createdAt' value={createdAt} className='p-3 mb-5 border border-slate-200 rounded-lg' required onChange={(e) => setCreatedAt(e.target.value)} />

            <Form.Item>
              <Button htmlType='submit' type='primary' size='large'>Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Toaster />
    </>
  )
}

export default App