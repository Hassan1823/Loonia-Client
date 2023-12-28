import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
      <div className="flex justify-center items-center min-h-screen h-auto w-full">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  )
}

export default Loader