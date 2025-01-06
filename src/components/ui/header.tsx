import React from 'react'

type Props = {
    backUrl: string
    title: string
    className?: string
}

const Header = (props: Props) => {
  return (
    <div className={`flex w-full items-center ${props.className}`}>
        <span className='text-blue-300 mr-4'><a href={props.backUrl}>Back</a></span>
        <h1 className='text-3xl'>{props.title}</h1>
    </div>
  )
}

export default Header