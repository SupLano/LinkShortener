import './App.css';
import Nav from './Nav';
import {createContext, useRef, useState} from 'react'
import React from 'react'
import Content from './Content';

export const PageTypeContext = createContext();

export default function App() {

    let [PageType, setPageType] = useState(true) //TRUE represents the link Shortener, while FALSE represents the Link Revealer
    
    const NavRef = useRef()
    const PageTrue = useRef() 
    const PageFalse = useRef() 

   

  return (
    <PageTypeContext.Provider value={{ PageType, PageTrue, PageFalse, NavRef,setPageType }}>
        <div className={'App h-screen w-screen flex bg-teal-50'}>
                <div className='w-5/6 mx-auto my-auto flex flex-col items-stretch rounded-lg shadow-lg bg-red-400 relative'>
                        <Nav/>
                        <Content/>
                        <a href='https://github.com/SupLano/LinkShortener' target="_blank" rel="noopener noreferrer" className={'absolute -bottom-7 right-2  text-center font-extralight italic'}>Source &#8599;</a>
                </div>                
        </div>
    </PageTypeContext.Provider>
  
  )
}
