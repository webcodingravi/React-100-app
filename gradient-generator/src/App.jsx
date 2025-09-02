import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const App=() => {
  const [num, setNum]=useState(12);
  const [type, setType]=useState('linear');
  const [gradients, setGradients]=useState([]);

  const getHexColorCode=() => {
    const rgb=255*255*255
    const random=Math.random()*rgb
    const int=Math.floor(random)
    const hexCode=int.toString(16)
    const colorHex=hexCode.padEnd(6, "0");
    return `#${colorHex}`
  }

  const generateGradient=() => {
    const colors=[]
    for (let i=0; i<=num; i++) {
      const color1=getHexColorCode()
      const color2=getHexColorCode()
      const degree=Math.floor(Math.random()*360)
      const degreeString=`${degree}deg`
      if (type=="linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString},${color1},${color2})`,
          css: `background: 'linear-gradient(${degreeString},${color1},${color2})'`
        })
      } else {
        colors.push({
          gradient: `radial-gradient(circle,${color1},${color2})`,
          css: `background: 'radial-gradient(circle,${color1},${color2})'`
        })
      }

    }

    setGradients(colors)
  }

  const onCopy=(css) => {
    navigator.clipboard.writeText(css)
    toast.success("Gradient code copyied.")
  }
  useEffect(() => {
    generateGradient()
  }, [num, type])

  return (
    <>
      <div className='bg-slate-200 min-h-screen w-full py-12 px-3 md:px-0'>
        <div className='w-11/12 mx-auto bg-white/70 py-8 rounded-xl px-5 md:flex justify-between items-center'>
          <h1 className='md:text-3xl text-2xl font-bold'>🎨 Gradient Generator - {type}</h1>

          <div className='flex gap-4 mt-3 md:mt-0'>
            <input type="text" className='border border-slate-300 focus:outline-none rounded p-2.5 w-25' placeholder='12' onChange={(e) => setNum(Number(e.target.value))} />
            <select value={type} className='p-2.5 border border-slate-300 focus:outline-none rounded' onChange={(e) => setType(e.target.value)}>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button className='px-16 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded font-medium cursor-pointer' onClick={generateGradient}>Generate</button>
          </div>
        </div>

        <div className='grid md:grid-cols-4 grid-cols-1 gap-8 w-11/12 mx-auto mt-8'>
          {
            gradients.map((item, index) => (
              <div key={index} className='rounded-xl h-[250px] relative' style={{ background: item.gradient }}>
                <button onClick={() => onCopy(item.css)} className='bg-black/75 text-white rounded absolute bottom-2 right-2 p-1 cursor-pointer font-light text-sm focus:outline-none'>Copy</button>
                <span className='absolute top-2 left-2 bg-black/75 text-white p-1 font-light text-sm'>HEX: {getHexColorCode()}</span>
              </div>
            ))
          }


        </div>

      </div>

      <Toaster />
    </>
  )
}

export default App