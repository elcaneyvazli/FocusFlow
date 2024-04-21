import { ChevronRightIcon, ClockIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Breadcrumb() {
  return (
    <div className='bg-input-bg border border-input-border px-16 rounded-main flex-row gap-8 items-center hidden sm:flex'>
        <div className='flex flex-row gap-4 items-center h-40'>
            <DocumentCheckIcon className='h-16 w-16 text-primary' />
            <h1 className='text-primary text-sm font-medium'>
                To-do Task
            </h1>
        </div>
        <ChevronRightIcon className='h-16 w-16 text-primary' />
        <div className='flex flex-row gap-4 items-center'>
            <ClockIcon className='h-16 w-16 text-primary' />
            <h1 className='text-primary text-sm font-medium'>
                Pomodoro
            </h1>
        </div>
    </div>
  )
}
