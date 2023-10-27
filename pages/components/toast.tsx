'use client';
import { Toast } from 'flowbite-react'
import Icon from "@phosphor-icons/react"
import { useState } from 'react';

interface ToastComponentProps {
  title: string,
  disc?: string,
  icon: Icon.IconProps,
  oFunc: boolean,
  cFunc: Function
}

export default function ToastComponent({icon, oFunc, cFunc, title, disc = 'ok'}: ToastComponentProps) {
  const props = {oFunc, cFunc}
  return (
    <div>
      {props.oFunc && (
      <Toast>
        <div className='absolute inline-flex items-center px-6 py-4 bottom-0 right-0 m-6 bg-slate-700 w-fit rounded-lg'>
          <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-200 ${title==='Error' ? 'bg-red-500' : 'bg-teal-500'}`}>
            <>
              {icon}
            </>
          </div>
          <div className="ml-3 text-base font-normal">
              {title}
          <div className='mb-2 text-sm text-slate-400'>
              {disc}
          </div>
          </div>
          <Toast.Toggle onDismiss={()=>{cFunc(false)}} className='items-center h-8 w-8 justify-center' />
        </div>
      </Toast>
      )}
    </div>  
  )
}


