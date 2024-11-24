import React from 'react'
import VideoCardLessDetails from './VideoCardLessDetails'
import { Link } from 'react-router-dom'

function HistoryPage() {
  return (
    <div className='pl-16'>
      <p className='text-4xl font-bold pb-8'>Watch history</p>

      <div className='w-1/2 grid gap-3'>
        <div className='h-[15vh] '>
          <VideoCardLessDetails />
        </div>
      </div>
    </div>
  )
}

export default HistoryPage