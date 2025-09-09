import React, { useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Card, Form, InputNumber, Select, Button, Tooltip, message, Empty } from 'antd'
import { Copy } from 'lucide-react'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import SyntaxHighlighter from 'react-syntax-highlighter';
import moment from 'moment'


const App=() => {
  const [payload, setPayload]=useState('')
  const [dataType, setDataType]=useState('')
  const [getItem, setItem]=useState('')


  const designation=[
    'manager',
    'sales executive',
    'front-end developer',
    'backend developer',
    'android developer',
    'ceo',
    'cto',
    'product manager'
  ]

  const getDesignation=() => {
    const index=Math.floor(Math.random()*designation.length)
    return designation[index]
  }

  const generateUser=() => {
    return {
      id: nanoid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: 'international' }),
      gender: faker.person.gender(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime()
    }
  }

  const generateProducts=() => {
    const title=faker.commerce.productName();
    return {
      id: nanoid(),
      title: title,
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price({ min: 1000, max: 2000 })),
      descount: Number(faker.commerce.price({ min: 0, max: 100 })),
      rating: Number(faker.commerce.price({ min: 1, max: 5 })),
      category: faker.commerce.productAdjective(),
      brand: faker.company.buzzAdjective(),
      image: `https://picsum.photos/600/400?text=${title}`,
      createdAt: faker.date.anytime()
    }
  }

  const generatePayments=() => {

    return {
      id: nanoid(),
      user: {
        id: nanoid(),
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        mobile: faker.phone.number({ style: 'international' }),
      },
      product: {
        id: nanoid(),
        title: faker.commerce.productName()
      },
      amount: Number(faker.commerce.price({ min: 1000, max: 2000 })),
      orderId: `ORD-${nanoid()}`,
      transactionId: `TSC-${nanoid()}`,
      method: 'upi',
      tax: Number(faker.commerce.price({ min: 0, max: 100 })),
      createdAt: faker.date.anytime()
    }
  }


  const generateEmployes=() => {
    return {
      id: nanoid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: 'international' }),
      gender: faker.person.gender(),
      salary: Number(faker.commerce.price({ min: 20000, max: 100000 })),
      designation: getDesignation(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime()
    }
  }


  const generateData=(values) => {
    const tmp=[]
    for (let i=0; i<values.noOfData; i++) {
      if (values.data==='users') {
        tmp.push(generateUser())
      }
      else if (values.data==='products') {
        tmp.push(generateProducts())
      }
      else if (values.data==='payments') {
        tmp.push(generatePayments())
      }

      else if (values.data==='employees') {
        tmp.push(generateEmployes())
      } else {
        message.error("Match not found")
      }

    }

    const str=JSON.stringify(tmp, null, 4)
    setPayload(str)
    setDataType(values.data);
    setItem(values.noOfData)


  }
  const onCopy=() => {
    navigator.clipboard.writeText(payload)
    message.success('Data Copyied')
  }
  return (
    <>
      <div className='bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-800 min-h-screen py-22'>
        <div className='text-slate-200 md:flex justify-between px-6 md:w-10/12 mx-auto'>
          <div>
            <h1 className='text-4xl font-bold pb-3'>Dummy JSON Generator</h1>
            <p>I Generated 100 realistic JSON records (MongoDB Extended JSON style) and saved them to a file.</p>
          </div>

          {
            payload&&
            <div className='px-2 border border-gray-200 rounded-xl text-sm flex flex-col justify-center md:py-0 py-2 w-fit mt-4 md:mt-0'>
              <h1 className='capitalize'>{dataType}</h1>
              <span >{getItem} items •  {moment(payload.createdAt).format('DD MMM YYYY hh:mm A')}</span>
            </div>
          }

        </div>


        <div className='md:w-10/12 mx-auto px-6 md:mt-16 mt-8'>
          <div className='grid md:grid-cols-3 gap-8'>
            <Card className='!border border-gray-200 !bg-gray-900 col-span-1 h-fit'>
              <Form layout='vertical' className='!space-y-10' onFinish={generateData} initialValues={{
                data: "users",
                noOfData: "24"
              }}>
                <Form.Item label={<label className='!text-white !font-medium'>Data type</label>} name="data" rules={[{ required: true }]}>
                  <Select size='large' placeholder="Choose Data">
                    <Select.Option value="users">Users</Select.Option>
                    <Select.Option value="products">Products</Select.Option>
                    <Select.Option value="payments">Payments</Select.Option>
                    <Select.Option value="employees">Employees</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label={<label className='!text-white !font-medium'>Number of items (max 100)</label>} name="noOfData" rules={[{ required: true }]}>
                  <InputNumber size='large' max={100} placeholder='0' className='!w-full !bg-transparent !border-2 custom-text-color'>
                  </InputNumber>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" size="large" className='!bg-indigo-600 !border-0 w-full !text-white hover:!bg-indigo-700 hover:scale-104 transition-transform duration-300'>Generate</Button>
                </Form.Item>
              </Form>
            </Card>

            <Card className='!border border-gray-200 !bg-gray-900 col-span-2 overflow-auto'>
              <div className='flex justify-between text-white'>
                <div>
                  <h1 className='text-xl font-bold'>Payload Preview</h1>
                </div>
                <div>
                  <Tooltip title="Copy data">
                    <button className='border border-gray-200 p-2 rounded-xl cursor-pointer flex gap-2 items-center' onClick={onCopy}>
                      <Copy className='h-4 w-4' />
                      Copy
                    </button>
                  </Tooltip>

                </div>
              </div>

              {
                payload.length===0?
                  <Empty description={<span className='text-white'>Click generate button to get your first payload</span>} />:

                  <div className='mt-4 h-[500px] overflow-auto border border-gray-200 rounded-xl p-4'>
                    <SyntaxHighlighter
                      language="javascript"
                      style={{
                        hljs: {
                          color: "#abb2bf",

                        },
                        "hljs-comment": { color: "#5c6370" },
                        "hljs-keyword": { color: "#3e4b5b " },
                        "hljs-built_in": { color: "#56b6c2" },
                        "hljs-function": { color: "#61afef" },
                        "hljs-string": { color: "#98c379" },
                        "hljs-number": { color: "#d19a66" },
                        "hljs-variable": { color: "#e5c07b" },
                      }}
                    >
                      {payload}
                    </SyntaxHighlighter>

                  </div>
              }

            </Card>

          </div>
        </div>
      </div>

    </>
  )
}

export default App