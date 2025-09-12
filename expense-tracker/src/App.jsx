import { Edit, Trash2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Button, DatePicker, Form, Input, InputNumber, message, Modal } from 'antd'
import moment from 'moment/moment';
import { useExpense } from './zustand/useExpesnse';
import { nanoid } from 'nanoid';

const App=() => {
  const [form]=Form.useForm();
  const [open, setOpen]=useState(false);
  const { expenses, setExpense, deleteExpense, updateExpense, search }=useExpense()
  const [editId, setEditId]=useState(null)

  const createExpenes=(values) => {
    values.id=nanoid()
    values.date=moment(values.date).toDate();
    setExpense(values)
    message.success("Expenses Created Successfully")
    handleClose();
  }

  const handleClose=() => {
    setEditId(null)
    setOpen(false)
    form.resetFields();
  }

  const edit=(item) => {
    setEditId(item.id)
    item.date=moment(item.date)
    setOpen(true)
    form.setFieldsValue(item)
  }

  const saveExpense=(values) => {
    values.date=moment(values.date).toDate()
    updateExpense(editId, values)
    handleClose();
    message.success("Expenses Updated Successfully")
  }
  return (
    <>
      <div className='bg-slate-900 min-h-screen py-12'>
        <div className='w-9/12 mx-auto bg-white rounded-xl'>
          <div className='p-8 flex flex-col gap-6'>
            <div className='md:flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Expense Tracker</h1>
              <button onClick={() => setOpen(true)} className='mt-3 md:mt-0 flex items-center bg-indigo-600 text-white rounded px-8 py-3 font-medium cursor-pointer hover:scale-105 transition-transform duration-300'>
                <Plus />
                Add New</button>
            </div>
            <input type="text" onChange={(e) => search(e.target.value)} placeholder='Search these expenses' className='p-3 rounded border border-gray-300 focus:outline-none' />
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-indigo-600 text-white text-left'>
                  <tr >
                    <th className='py-2.5 pl-4'>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    expenses.map((Item, index) => (
                      <tr key={index} className='border-b border-b-gray-200'>
                        <td className='pl-4 py-4'>{Item.title}</td>
                        <td>{Item.description}</td>
                        <td>₹{Item.amount.toLocaleString()} /-</td>
                        <td>{moment(Item.date).format("DD MM YYYY, hh::mm A")}</td>
                        <td>
                          <div className='flex gap-3'>
                            <button onClick={() => edit(Item)} className='w-8 h-8 bg-green-400 text-white flex items-center justify-center rounded cursor-pointer'>
                              <Edit className='w-4 h-4' />
                            </button>

                            <button onClick={() => deleteExpense(Item.id)} className='w-8 h-8 bg-rose-500 text-white flex items-center justify-center rounded cursor-pointer'>
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                        </td>
                      </tr>

                    ))
                  }

                </tbody>


              </table>
            </div>
            <div className='flex items-center justify-end'>
              <h1 className='text-2xl font-bold'>Total Expenses - ₹{expenses.reduce((sum, item) => sum+item.amount, 0).toLocaleString()} /-</h1>

            </div>
          </div>
        </div>
      </div>

      <Modal open={open} footer={null} maskClosable={false} onCancel={handleClose}>
        <Form layout="vertical" form={form} onFinish={editId? saveExpense:createExpenes} >
          <Form.Item label="Expense title" name="title" rules={[{ required: true }]}>
            <Input size="large" placeholder="Expense name here" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea size='large' placeholder='Description goes here...' rows={4} />
          </Form.Item>

          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber size="large" placeholder="Amount" className='!w-full' />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker size='large' placeholder='Choose expense date' className='!w-full' />
          </Form.Item>


          <Form.Item>
            {
              editId?
                <Button type='primary' size='large' htmlType='submit' danger>Save</Button>:
                <Button type='primary' size='large' htmlType='submit'>Submit</Button>
            }

          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default App