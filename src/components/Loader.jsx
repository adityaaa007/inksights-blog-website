import React from 'react'
import { TailSpin } from "react-loader-spinner";

const Loader = ({text = "Loading"}) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#EA580C"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="font-inter-regular text-xl mt-4 text-orange-600">{text}</p>
    </div>
  )
}

export default Loader