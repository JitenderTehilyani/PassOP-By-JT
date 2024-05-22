import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

// Main UI of PassOp
const Manager = () => {

    const ref = useRef();
    // toggel password hide and view
    const passwordRef = useRef();

    // form usestate
    const [form, setform] = useState({ site: "", username: "", password: "" })
    // password usestate
    const [passwordArray, setPasswordArray] = useState([]);

    const [isToastVisible, setIsToastVisible] = useState(false); // State for toast visibility

    // usestate to save password in LS
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    // function to copy text
    const copyText = (text) => {
        toast('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
            // dark them in dark mode 
        });
        navigator.clipboard.writeText(text);
    }


    // function to show password
    const showPassword = () => {

        passwordRef.current.type = "text";
        // change eye icon
        if (ref.current.src.includes("icons/eye.png")) {
            passwordRef.current.type = "password";
            ref.current.src = "icons/visible.png"
        }
        else {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eye.png"
        }
    }

    // function to save password
    const savePassword = () => {

        if(form.site.length>1 && form.username.length>1 && form.password.length>1){
        setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
        setform({ site: "", username: "", password: "" });
        // console.log(...passwordArray, form);

        toast('Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
            // dark them in dark mode 
        });
    }

    else{
        toast('Error: at least 2 char!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
            // dark them in dark mode 
        });
    }

    }

    // function to Delete password
    const deletePassword = (id) => {

        // confirm and then delete
        let c = confirm(`Do you really want to delete this password?`);
        if(c){

        
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
            // dark them in dark mode 
        });
        // console.log(...passwordArray, form);
        }
    }
    
    // function to edit password
    const editPassword = (id) => {

        setform(passwordArray.filter(i=>i.id===id)[0]);
        setPasswordArray(passwordArray.filter(item=>item.id!==id));

    }

    // handle change
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* toast alerts */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            {/* // Background of web */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            {/* Container */}
            <div className="p-3 md:p-0 md:mycontainer min-h-[81.5vh]">

                {/* Titles */}
                <h1 className='text-4xl font-bold text-center'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
                </h1>
                <h3 className='text-green-700 text-lg text-center font-bold'>Your Own Password Manager</h3>

                {/* User inputs */}
                <div className="flex flex-col p-4 text-black gap-8 items-center">

                    {/* Url input */}
                    <input onChange={handleChange} value={form.site} className='rounded-xl border-2 border-green-500 w-full p-4 py-1' type="text" placeholder='Enter URL' name='site' id='site' />

                    {/* more inputs */}
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">

                        {/* Website name */}
                        {/* <input className='rounded-xl border-2 border-green-500 w-full p-4 py-1' type="text" placeholder='Enter website name' /> */}

                        {/* username input */}
                        <input onChange={handleChange} value={form.username} className='rounded-xl border-2 border-green-500 w-full p-4 py-1' type="text" placeholder='Enter username' name='username' id='username' />

                        {/* password input */}
                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} className='rounded-xl border-2 border-green-500 w-full p-4 py-1' type="password" placeholder='Enter password' name='password' id='password' />

                            {/* Show password */}
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/visible.png" alt="Show" />
                            </span>
                        </div>

                    </div>

                    {/* save btn */}
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full p-3 px-8 gap-2 w-fit font-bold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>

                </div>

                {/* table of passwords */}
                <div className="passwords">
                    <h2 className='py-4 font-bold text-2xl text-center mb-2'>Your Passwords</h2>

                    {/* if no passwords are there */}
                    {passwordArray.length === 0 && <div className=''>No passwords to show</div>}

                    {/* if passwords are there */}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>

        </>
    )
}

export default Manager
