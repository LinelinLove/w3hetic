import React from 'react'
import Search from '../molecules/Search'

const DashboardPage = () => {
  return (
    <>
    <div className='text-white flex grid col-4 justify-center py-4'>
      <h1 className='pt-2 text-3xl font-bold'>Welcome Mimi{}</h1>
      <h2 className='pb-12 text-md font-semibold'>Memory left : {} giga </h2>
    </div>
    <div className='lg:pt-16 lg:pl-12'><Search/></div>
    
    </>
  )
}

export default DashboardPage