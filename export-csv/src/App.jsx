import React, { useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Form, Modal, Input, InputNumber, Select, DatePicker, Button } from 'antd'
import moment from 'moment'
import { CSVLink } from 'react-csv'

const App=() => {
  const [form]=Form.useForm()
  const [data, setData]=useState([])
  const [open, setOpen]=useState(false)
  const createRecord=(values) => {
    values.date=moment(values.date).toDate()
    setData([
      ...data,
      values
    ])
    handleClose()
  }

  const handleClose=() => {
    setOpen(false)
    form.resetFields()
  }
  return (
    <>
      <div className='bg-slate-200 min-h-screen space-y-8 py-12'>
        <h1 className='text-4xl font-bold text-center'>CSV Example</h1>
        <div className='bg-white rounded-lg p-4 w-9/12 mx-auto flex items-center gap-5'>
          <button onClick={() => setOpen(true)} className='bg-indigo-600 text-white font-medium px-12 py-3 rounded cursor-pointer'>New Record</button>
          <CSVLink data={data} >
            <button className='bg-rose-600 text-white font-medium px-12 py-3 rounded cursor-pointer'>CSV</button>

          </CSVLink>


        </div>
        <div className='bg-white rounded-lg p-4 w-9/12 mx-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-left bg-rose-500 text-white'>
                <th className='pl-4 py-4'>Customer's name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index} className='text-left bg-white border-b gray-200 border-b-gray-200 text-black/60'>
                    <td className='py-4 pl-4'>{item.customerName}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.product}</td>
                    <td>₹{item.amount.toLocaleString()}</td>
                    <td>{item.status}</td>
                    <td>{moment(item.date).format('MMM DD YYYY, hh:mm A')}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
      <Modal open={open} footer={null} onCancel={handleClose}>
        <Form layout='vertical' form={form} onFinish={createRecord}>
          <Form.Item label="Customer's name" name="customerName" rules={[{ required: true }]} >
            <Input size="large" placeholder="Enter Customer name" />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={[{ required: true }]} >
            <Input size="large" placeholder="Enter Mobile Name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]} >
            <Input size="large" placeholder="email@gmail.com" />
          </Form.Item>

          <Form.Item label="Product" name="product" rules={[{ required: true }]} >
            <Input size="large" placeholder="Enter Product Name" />
          </Form.Item>

          <Form.Item label="Amount" name="amount" rules={[{ required: true, type: 'number' }]} >
            <InputNumber size="large" placeholder="Amount" className='!w-full' />
          </Form.Item>


          <Form.Item label="status" name="status" rules={[{ required: true }]} >
            <Select size='large' placeholder="Choose status">
              <Select.Option value="cold">Cold</Select.Option>
              <Select.Option value="Hot">Hot</Select.Option>
              <Select.Option value="Closed">Closed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]} >
            <DatePicker size='large' className='!w-full' />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" size="large" type="primary">Submit</Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}

export default App