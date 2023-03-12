import './App.css';
import {useState, useRef,useEffect} from 'react'
import { FaClipboard, FaTwitter, FaFacebookF, FaWhatsapp} from "react-icons/fa";
import * as variable from './variable'
import validator from 'validator';
function App() {

  useEffect(() => {
    InputBox.current.focus()
    setError(false)
  }, [])

  const [placeholder, setPlaceholder] = useState(variable.placeholder_true)
  const [opacity, setOpacity] = useState(variable.opacity_true)
  const [page, setPage] = useState(variable.pageTrue)

  const Input = true
  const [error, setError] = useState(false)
  const [get, setGet] = useState('short')

  const setFalse = () => {
    // InputBox.current.value= null
    // ResultBox.current.value = null
    setPlaceholder(variable.placeholder_false)
    setOpacity(variable.opacity_false)
    setPage(variable.pageFalse)
    setGet('reveal')
  }

  const setTrue = () => {
    setPlaceholder(variable.placeholder_true)
    setOpacity(variable.opacity_true)
    setPage(variable.pageTrue)
    setGet('short')
  }

  const InputBox = useRef()
  const ResultBox = useRef()
  const CopyBox = useRef()
   
  const handleInput = () =>{
    ResultBox.current.value = null
    ResultBox.current.classList.remove('bg-white','opacity-100', 'shadow-lg', 'shadow-shine', 'animate-bounce');
    setError(false)
  }

  const handleSubmit = () =>{
    console.log(get)
   switch (get) {
      case 'short':
          validator.isURL(InputBox.current.value) ? fetch(`https://api.shrtco.de/v2/shorten?url=${InputBox.current.value}`).then( data => data.json()).then (data => {handleResultRender(data.result.short_link)})
           : setError(true) ; ResultBox.current.value = null
       break;

      case 'reveal':
        fetch(`https://api.shrtco.de/v2/info?code=${InputBox.current.value}`).then( data => data.json()).then (data => {handleResultRender(data.result.url)})
        break;

      default:
       break;
   }
  }

  const handleResultRender = (result) => {
    // ResultBox.current.className += 'bg-red-200'
    ResultBox.current.classList.add('bg-white','opacity-100', 'shadow-lg', 'shadow-shine', 'animate-bounce');
    CopyBox.current.classList.add('animate-pulse')
    ResultBox.current.value = result
  }

  const handleCopy = () =>{
    ResultBox.current.value ? navigator.clipboard.writeText(ResultBox.current.value) : setError(true)
  }

  return (
    <div className="App h-screen bg-gradient-to-b from-black via-cyan-900 flex overflow-x-hidden">
          <div className={'w-4/5 h-3/4 bg-gray-200 bg-opacity-70 mx-auto my-auto py-4 md:pt-20 rounded-r rounded-b shadow-lg relative'}>

                <div className='absolute -top-10 rounded-tl rounded-tr flex justify-around gap-1 items-stretch font-extrabold text-gray-800'>
                    <button onClick={setTrue} className={page.shorten}>Shorten</button>
                    <button onClick={setFalse} className={page.reveal}>Reveal</button>
                </div>

                <div className={'text-center word-spacing text-gray-900 px-4 pb-20  z-10 uppercase opacity-80 py-5 text-2xl font-bold'}>
                    Simple   Link   Shortener
                </div>

                <div className={'flex flex-wrap justify-center ite gap-10 mx-auto w-4/5'}>
                    {Input && <input onInput={handleInput} ref={InputBox} placeholder={placeholder} className={'placeholder:text-center placeholder:font-thin bg-gray-200 rounded basis-2/3 flex-1 outline-none p-2 place-content-center relative'}></input> }
                    {error && <div className={'text-small text-red-500 italic absolute bottom-5 md:bottom-7 animate-bounce'}>*  Please enter a valid URL*  </div>}
                    <div onClick={handleSubmit} className={'rounded border-2 text-white py-1 px-4 cursor-pointer bg-gray-800 hover:bg-gray-600'}>Submit</div>
                </div>

                <div className={'w-4/5 mx-auto py-20 flex justify-center relative'}>
                    <input disabled ref={ResultBox} className={'rounded-lg w-2/3 outline-none  h-11 py-3 px-10 text-center opacity-40'}></input>
                    <div onClick={handleCopy}  ref={CopyBox} className={'px-4 mx-1 rounded-sm opacity-80 focus:opacity-40  transition ease-in-out delay-150 overflow-hidden'}>
                           <FaClipboard className={'h-8 w-8 opacity-90 cursor-pointer z-50 shadow-lg'} />
                    </div>
                </div>

                <div className={opacity}>
                  <div className={'flex justify-evenly'}>
                    <FaTwitter color={'skyblue'} className={'h-10 w-10 opacity- cursor-pointer'}/>
                    <FaFacebookF color='darkblue' className={'h-10 w-10 opacity- cursor-pointer'}/>
                    <FaWhatsapp color='green' className={'h-10 w-10 opacity- cursor-pointer'}/>            
                  </div>
                  <p className={'mx-auto w-full text-center py-4 font-thin italic'}>Share shortened link on socials</p>
                </div>

                <a href='https://github.com/SupLano/LinkShortener' target="_blank" rel="noopener noreferrer" className={'absolute -bottom-8 md:-bottom-8 right-0 text-center font-extralight italic h-fit opacity-40 hover:opacity-90'}>Source &#8599;</a>
          
          </div>          
    </div>
  );

}
// bg-gradient-to-b from-black via-cyan-900
export default App;
