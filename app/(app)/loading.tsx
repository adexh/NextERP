import { Circle } from 'lucide-react';
import Image from 'next/image';


const Loading = () => {
  return <>
    <div className="bg-gray-100 flex flex-grow w-full place-content-center items-center">
      <div className=" animate-spin h-20 w-20 text-primary-600">
        <svg fill="currentColor" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm84,84H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.25977,48.76953a12.0001,12.0001,0,0,0-16.9707,16.9707l22.62695,22.627a12.0001,12.0001,0,0,0,16.97071-16.97071ZM128,180a12.0006,12.0006,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12.0006,12.0006,0,0,0,128,180ZM74.25977,164.76953l-22.627,22.62695a12.0001,12.0001,0,0,0,16.97071,16.97071l22.62695-22.627a12.0001,12.0001,0,0,0-16.9707-16.9707ZM76,128a12.0006,12.0006,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12.0006,12.0006,0,0,0,76,128ZM68.60352,51.63281A12.0001,12.0001,0,0,0,51.63281,68.60352l22.627,22.62695a12.0001,12.0001,0,0,0,16.9707-16.9707Z"
        /> </g></svg>
      </div>
    </div>
  </>
}

export default Loading;