import {React, useContext} from 'react'
import {PageTypeContext} from './App'


export default function Nav() {

  const handlePageSwitchTrue = () =>{
    
    setPageType(true)
    PageTrue.current.classList.add('bg-white')
    PageFalse.current.classList.remove('bg-white')
    }

    const handlePageSwitchFalse = () =>{
    PageFalse.current.classList.add('bg-white')
    PageTrue.current.classList.remove('bg-white')
    setPageType(false)
    }

  const {PageTrue, PageFalse, NavRef, setPageType} = useContext(PageTypeContext)
  return (
    <div ref={NavRef} className={'w-3/6 md:w-2/5 lg:w-1/5  flex  rounded-tl-lg text-center overflow-hidden h-full'}>
                    <div ref={PageTrue} onClick={handlePageSwitchTrue}  className={' w-1/2 py-2 pl-2 bg-teal-900  hover:bg-teal-400 font-bold font-Chakra cursor-pointer'}>shorten</div>
                    <div ref={PageFalse} onClick={handlePageSwitchFalse}  className={' w-1/2 py-2 pl-2 bg-teal-900 hover:bg-teal-400 pr-1 font-bold font-Chakra cursor-pointer '}>reveal</div>
    </div>
  )
}
