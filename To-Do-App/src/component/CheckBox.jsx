import {Check} from "lucide-react";

const CheckBox = ({id, checked, onChange, label}) => {
  return (
    <label className='flex gap-4 items-center cursor-pointer'>
      <input id={id} type='checkbox' className='hidden' checked={checked} onChange={onChange}/>

      <div className={`flex size-6 items-center  justify-centergap-2 border-2 border-secondary-text rounded-md 
        ${checked == true ? "bg-accent border-none" : "bg-transparent"}`}>

        {checked == true ? (<Check className='text-black size-6 '/>) : (null)}
      </div>

      <span className={`flex-1 w-full ${checked ? ("line-through text-gray-200") : ("text-white")}`}> {label} </span>
    </label>
  )
}

export default CheckBox;