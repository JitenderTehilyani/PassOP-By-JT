import React from 'react'

// navbar
const Navbar = () => {
    return (
        // nav
        <nav className='bg-slate-800 text-white'>

            <div className="flex justify-between items-center px-15 py-5 h-14 mycontainer">

                {/* logo */}
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
                </div>
                {/* links */}
                {/* <ul>

                    <li className='flex gap-5'>

                        <a className=' hover:font-bold' href="#">Home</a>
                        <a className=' hover:font-bold' href="#">About</a>
                        <a className=' hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}

                {/* github link */}
                <button className='text-white hover:ring-white ring-1 hover:bg-green-600 bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center min-w-[7rem] mb-5' href="https://github.com/JitenderTehilyani/PassOP-By-JT.git" target="_blank">
                    <img src="/icons/github-mark-white.png" className='w-9 p-1' alt="GitHub logo" />
                    <span className='font-bold px-2'>GitHub</span>
                </button>

            </div>

        </nav>
    )
}

export default Navbar
