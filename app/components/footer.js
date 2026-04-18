import React from 'react'

const currentyear = new Date().getFullYear()
const footer = () => {
   
  return (
     <div className=' bg-[#19172C] flex text-white gap-5 justify-center items-center h-8 px-4 '>
        <div>Copyright &copy; {currentyear}; Get Me A Chai - All rights reserved</div>
     </div>

  )
}

export default footer
