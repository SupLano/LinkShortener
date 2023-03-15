import {React, useContext, useEffect, useRef, useState} from 'react'
import validator from 'validator';
import { FaClipboard, FaTwitter, FaFacebookF, FaWhatsapp} from "react-icons/fa";
import { PageTypeContext } from './App';


export default function Page() {
  let { PageType, PageTrue, PageFalse, NavRef,setPageType} = useContext(PageTypeContext)

  const InputRef = useRef()
  const ResultBox = useRef()
  const [error, setError] = useState(true)
  const [resultIn, setResultIn] = useState(false)
  const [bounce, setBounce] = useState(false)
  useEffect(() => {
    InputRef.current.focus()
    setError(false)
  }, [])

  useEffect(() => {
    console.log('appearance changed')
    ResultBox.current.classList.remove('animate-bounce','bg-white','opacity-100', 'shadow-lg', 'shadow-shine')
    ResultBox.current.value = null
    setResultIn(false)
    setError(false)
  }, [PageType])
  

  const handleInput = () =>{
    setError(false)
    setResultIn(false)
    ResultBox.current.value = null
    ResultBox.current.classList.remove('animate-bounce','bg-white','opacity-100', 'shadow-lg', 'shadow-shine')
  }

  const handleSubmit = () =>{
    console.log('submitting...')
    console.log(PageType)
    setError(false)
    switch (PageType) {
      case true:
          validator.isURL(InputRef.current.value) ? fetch(`https://api.shrtco.de/v2/shorten?url=${InputRef.current.value}`) .then( data => data.json()).then (data => {handleResultRender(data.result.short_link)}) : setError(true)
          break;

      case false:
          fetch(`https://api.shrtco.de/v2/info?code=${InputRef.current.value}`).then( data => data.json()).then (data => {handleResultRender(data.result.url)})
          break;

      default:
       break;
   }
   
  }
  

  const handleResultRender = (result) => {
    ResultBox.current.classList.add('bg-white','opacity-100', 'shadow-md', 'shadow-shine', 'animate-bounce');
    ResultBox.current.value = result
    setResultIn(true)
  }

  const handleCopy = () => {
    ResultBox.current.value ? navigator.clipboard.writeText(ResultBox.current.value) : setError(true)
    setBounce(true)
    setTimeout(() => {
      setBounce(false)
    }, 200);
  }
  
  return (
    <>
    {
      
     
      <div className={'w-6/6 item justify-between bg-white py-10  rounded-b shadow-lg overflow-x-hidden'}>
      <div className={'text-2xl text-center font-semibold font-EB pb-10 tracking-wide'}>
          {PageType ? 'Simple   Link   Shortener' : 'Reveal Link (Code)'}
      </div>
      
      <div className={'py-6 pb-10 md:pb-0 px-2 flex flex-wrap justify-center gap-5 mx-auto w-5/6 text-center'}>
          <input ref={InputRef} placeholder = {PageType ? 'Enter link...':'Enter code to reveal link...'}  onInput={handleInput} className={'rounded placeholder:text-left placeholder:font-sans placeholder:text-sm  placeholder:font-extralight placeholder:tracking-widest placeholder:text-black text-black font-bold bg-gray basis-full md:basis-0 flex-1 bg-gra-50 opacity-40 bg-gray-200  outline-none p-2'}></input>
          <div onClick={handleSubmit} className={'submit rounded border-2 text-white py-1 px-4 cursor-pointer outline-none font-Chakra  bg-gray-800 hover:bg-teal-500'}>Submit</div>
          {error && <div className={'basis-full absolute top-20 md:top-5 text-center text-red-400 italic animate-bounce'}>{PageType ? '*  Please enter a valid URL*' : '*  Please enter a valid Code*'   }</div>}
      </div>
      
      <div className={'text-center w-4/5 md:w-3/5 mx-auto flex justify-center gap-2 py-10 bg-teal-5 rounded-lg'}>
          <input ref={ResultBox} disabled className={'shadow w-2/3 h-7 md:h-9 outline-none text-center opacity-70'}></input>
          <div className={'pt-1 px-1 absolut flex relative'}>
             <FaClipboard color={resultIn ? 'teal' : ''} onClick={handleCopy} className={resultIn ? 'h-8 w-12 opacity-100 items-center -translate-y-2 md:-translate-y-1  mb-3 md:pt-1 md:pb-0 cursor-pointer rounded' :'h-8 w-12 opacity-10 items-center -translate-y-2 md:-translate-y-1  mb-3 md:pt-1 md:pb-0'} />
             {bounce && resultIn && <p className={'absolute top-10 text-teal-600 italic animate-bounce-short text-xs'}>copied!</p>}
          </div>
          
      </div>
      
      <div className={'text-center py-8 mt-10 bg-bue-600'}>
        <div className={resultIn ? 'flex justify-center gap-16 text-center py-4 bg-re-300' : 'flex justify-center gap-16 text-center py-4 bg-re-300 opacity-90'}>
          <FaFacebookF color='darkblue' className={resultIn ? 'h-10 w-10 cursor-pointer opacity-100' : 'h-10 w-10 opacity-30'}/>
          <FaWhatsapp color='green' className={resultIn ? 'h-10 w-10 cursor-pointer opacity-100' : 'h-10 w-10 opacity-30'}/>            
          <FaTwitter color={'skyblue'} className={resultIn ? 'h-10 w-10 cursor-pointer opacity-100' : 'h-10 w-10 opacity-30'}/>
        </div>
        <p className={'py-10 font-thin italic'}>Share shortened link on socials</p>
      </div>

      
      </div>

    }
    </>
  )
}

