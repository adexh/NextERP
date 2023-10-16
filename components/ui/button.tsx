"use client"
interface Iprops {
  label: string
  onClick?: () => void
}

const Button = ({label, onClick}:Iprops) => {
  return <>
    <button className="text-white bg-primary-600 px-10 h-10 shadow-md shadow-primary-400 hover:bg-primary-700 active:translate-y-0.5 active:shadow-none rounded-xl" onClick={onClick}>
      {label}
    </button>
  </>
}

export default Button;