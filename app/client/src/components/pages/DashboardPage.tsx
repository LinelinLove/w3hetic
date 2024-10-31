import React from 'react'
import Search from '../molecules/Search'

const DashboardPage = () => {
  return (
    <>
    <div className='text-white flex grid col-4 justify-center py-4'>
      <h1 className='text-lg font-bold'>Welcome Mimi{}</h1>
      <h2>Memory left : {} giga </h2>
    </div>
    <Search/>
    </>
  )
}

export default DashboardPage