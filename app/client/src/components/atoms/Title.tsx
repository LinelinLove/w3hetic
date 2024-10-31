import React from 'react'
interface TitleProps {
  label: string;
}

const Title: React.FC<TitleProps> = ({label}) => {
  return (
    <h1 className='text-shadow text-3xl flex justify-center pt-6 pb-4 uppercase font-bold'>{label}</h1>
  )
}

export default Title