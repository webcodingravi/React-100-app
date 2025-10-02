import React, { useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import 'animate.css';
import { Eye } from 'lucide-react'
import { Form, Modal, Input, Button, message } from 'antd'
import { useContact } from './zustand/useContact';
import { nanoid } from 'nanoid'

const App=() => {
  const [passwordModal, setPasswordModal]=useState(false)
  const [open, setOpen]=useState(false)
  const { contacts, setContact }=useContact()
  const [form]=Form.useForm()
  const [selected, setSelected]=useState(null)


  const unlockContact=(value) => {
    const password=btoa(value.password)
    if (password===selected.password) {
      const mobileField=document.getElementById(selected.id)
      mobileField.innerHTML=atob(selected.mobile)

      message.success("Password Unlocked")
    }
    else {
      message.error("Incorrect password")
    }
    setPasswordModal(false)
  }

  const addContact=(value) => {
    value.password=btoa(value.password)
    value.mobile=btoa(value.mobile)
    value.id=nanoid()
    setContact(value)
    message.success("Contact Added!")
    handleClose()
  }

  const handleClose=() => {
    setOpen(false)
    form.resetFields()

  }
  const showPasswordModal=(value) => {
    setSelected(value)
    setPasswordModal(true)
  }

  return (
    <>
      <div className="animate__animated animate__fadeIn bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 min-h-screen py-12">
        <div className='w-9/12 mx-auto p-12 bg-white rounded-xl'>
          <div className='flex justify-between items-center'>
            <h1 className='text-center text-4xl font-bold'>Private Contact</h1>
            <Button size='large' type='primary' onClick={() => setOpen(true)}>Add Contact</Button>
          </div>

          <table className='w-full mt-8'>
            <thead>
              <tr className='bg-rose-500 text-white text-left'>
                <th className='py-3 pl-4'>SN</th>
                <th>Person</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                contacts.map((item, index) => (
                  <tr className='text-gray-600' key={index}>
                    <td className='py-3 pl-4'>{index+1}</td>
                    <td>{item.person}</td>
                    <td id={item.id}>{item.mobile}</td>
                    <td>
                      <div>
                        <Eye className='cursor-pointer hover:scale-120 duration-300' onClick={() => showPasswordModal(item)} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Modal open={passwordModal} footer={null} title="Unlock Contact" onCancel={() => setPasswordModal(false)}>
            <Form layout='vertical' onFinish={unlockContact}>
              <Form.Item label="Enter contact password" name="password" rules={[{ required: true }]}>
                <Input.Password size='large' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' size='large' htmlType='submit'>
                  Unlock
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal open={open} footer={null} title="Add New Contact" onCancel={handleClose}>
            <Form layout='vertical' form={form} onFinish={addContact}>
              <Form.Item label="Person's name" name="person" rules={[{ required: true }]} >
                <Input size='large' />
              </Form.Item>

              <Form.Item label="Mobile" name="mobile" rules={[{ required: true }]}>
                <Input size='large' />
              </Form.Item>

              <Form.Item label="Enter contact password" name="password" rules={[{ required: true }]}>
                <Input.Password size='large' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' size='large' htmlType='submit' danger>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>

    </>
  )
}

export default App