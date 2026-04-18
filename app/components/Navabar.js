"use client"
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'


const Navabar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    return (
        <nav className='bg-[#0f0030f0] flex text-white md:gap-5 justify-between items-center  md:h-14   flex-col md:flex-row px-2 pb-2 md:px-4 md:pt-3'>

            <Link href={"/"} className="logo font-bold flex text-white    items-center" >
                <img src="/tea.gif" className='flex items-center w-9 md:w-12'   alt="" />
                <span className=''>Get Me A Chai</span>
            </Link>

         
            <div className='flex justify-end'>


                {session && <>  <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                    setTimeout(() => {
                        setShowdropdown(false)
                    }, 100);
                }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="cursor-pointer text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-5 h-10.5 relative" type="button">Welcome - {`${session.user.name}`}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute  right-30.25  top-14   bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>
                }





                {session &&
                    <button className="text-white bg-linear-to-br to-blue-500 hover:bg-linear-to-bl  cursor-pointer Idark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 from-purple-600 focus:outline-none" onClick={() => { signOut() }}>
                        LogOut
                    </button>
                }
            </div>
            {
                !session && <div>
                    <Link href="/login">
                        <button className="text-white bg-linear-to-br to-blue-500 hover:bg-linear-to-bl  cursor-pointer Idark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 from-purple-600 focus:outline-none">
                            login
                        </button>
                    </Link>
                </div>
            }


        </nav >
    )
}

export default Navabar
