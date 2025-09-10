import React, { useRef, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { QRCode, Button, Modal, Input, Form } from 'antd'
import { Download } from 'lucide-react'

const App=() => {
  const [form]=Form.useForm()
  const divRef=useRef(null)
  const [open, setOpen]=useState(false)
  const [icon, setIcon]=useState('')
  const [qr, setQr]=useState({
    value: 'https://rkdesigner.epizy.com/',
    icon: '',
    bgColor: '#ffffff',
    color: '#000000'
  })


  const downloadNow=() => {
    const div=divRef.current
    const canvas=div.querySelector("canvas")
    const base64String=canvas.toDataURL("image/png")
    const a=document.createElement("a")
    a.href=base64String
    a.download="qr-code.png"
    a.click()
    a.remove();
  }

  const generateQr=(values) => {
    values.bgColor=values.bgColor||'#ffffff'
    values.color=values.color||"#000000"
    values.icon=icon
    setOpen(false)
    form.resetFields();
    setQr((prev) => ({
      ...prev,
      ...values
    }))
  }

  const chooseFile=(e) => {
    const file=e.target.files[0];
    const url=URL.createObjectURL(file);
    setIcon(url)
  }

  const handleClose=() => {
    setOpen(false)
    setIcon('')
  }

  return (
    <>
      <div className='bg-slate-100 min-h-screen flex flex-col items-center justify-center py-12 gap-8'>
        <h1 className='text-4xl font-bold mb-4'>Generate - QR Code</h1>
        <div ref={divRef} className='rounded-2xl p-4 bg-white shadow-lg w-fit hover:scale-105 transition-transform duration-300 cursor-pointer'>
          <QRCode value={qr.value} size={300} bgColor={qr.bgColor} color={qr.color} icon={qr.icon} />

        </div>
        <div className='flex gap-4'>
          <Button onClick={() => setOpen(true)} size="large" type="primary" className="!bg-gradient-to-br !from-red-600 !via-rose-500 !to-red-600 hover:!scale-105 !transition-transform !duration-300 !cursor-pointer !border-none" >
            Generate new QR</Button>

          <Button onClick={downloadNow} size="large" type="primary" className="!bg-gradient-to-br !from-violet-600 !via-blue-500 !to-indigo-600 hover:!scale-105 !transition-transform !duration-300 !cursor-pointer !border-none" icon={<Download className="w-4 h-4" />}>
            Downlaod Now</Button>
        </div>

        <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
          <h1 className='text-lg font-medium mb-4'>Generate your QR</h1>
          <Form form={form} onFinish={generateQr} >
            <Form.Item label="URL" rules={[{ required: true, type: "url" }]} name='url'>
              <Input size='large' placeholder='https://domain.com' />
            </Form.Item>

            <Form.Item label="BG Color" name='bgColor'>
              <Input size='large' type="color" />
            </Form.Item>

            <Form.Item label="Color" name='color'>
              <Input size='large' type="color" />
            </Form.Item>

            <Form.Item label="Logo" name='logo'>
              <Input size='large' type="file" accept='image/*' onChange={chooseFile} />
            </Form.Item>

            <Form.Item>
              <Button size='large' type='primary' htmlType='submit'>
                Generate
              </Button>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    </>
  )
}

export default App