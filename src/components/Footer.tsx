import { Link } from '@tanstack/react-router'
import React from 'react'
import labprochem from '../data/dairychem.json'
import logo from '../assets/logo.jpg'
const Footer = () => {
    return (
        <footer className='bg-[url(/ui_images/footer2.png)] bg-cover bg-center '>
            <div className='h-full bg-black/70 '>
                <div className='max-w-6xl mx-auto h-full  px-4 md:px-10 lg:px-0 py-20'>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-15'>
                        <div className=''>
                            <div className='flex items-center gap-2'>
                                <span className=' '>
                                    <img src={logo} className='w-15' alt="" />
                                </span>
                                <span>
                                    <h1 className='text-lg  font-bold text-white'>Dairy Chem Pharma Machinery</h1>
                                </span>
                            </div>
                            <p className='text-white mt-10 text-[15px]'>Dairy Chem Pharma is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on any information contained within the site. While the information...</p>
                        </div>

                        <div className=' text-white flex flex-col gap-3'>
                            <h2 className='text-lg font-bold mb-4'>Corporate</h2>
                            <Link to="/" className='text-sm font-bold hover:text-accent'>Home</Link>
                            <Link to="/about" className='text-sm font-bold hover:text-accent'>About</Link>
                            <Link to="/contact" className='text-sm font-bold hover:text-accent'>Contact Us</Link>
                            <Link to="/blogs" className='text-sm font-bold hover:text-accent'>Blogs</Link>
                        </div>

                        <div className=' text-white flex flex-col gap-3'>
                            <h2 className='text-lg font-bold mb-4'>Categories</h2>
                            <Link to="/products" search={{ filter: 'Capsule' }} className='text-sm font-bold hover:text-accent'>Capsules</Link>
                            <Link to="/products" search={{ filter: 'Ointment' }} className='text-sm font-bold hover:text-accent'>Ointment</Link>
                            <Link to="/products" search={{ filter: 'Granulation' }} className='text-sm font-bold hover:text-accent'>Granulation</Link>
                            <Link to="/products" search={{ filter: 'Liquid' }} className='text-sm font-bold hover:text-accent'>Liquid</Link>
                            <Link to="/products" search={{ filter: 'Injectable' }} className='text-sm font-bold hover:text-accent'>Injectibles</Link>

                        </div>
                        <div className=' text-white flex flex-col gap-3 md:col-span-3 lg:col-span-1'>
                            <div>
                                <h2 className='text-lg font-bold mb-3'>Head Office</h2>
                                <p className='text-sm font-bold '>
                                    {labprochem[0].address}
                                </p>
                            </div>
                            <div>
                                <h2 className='text-lg font-bold mb-3'>Call Us</h2>
                                <p className='text-sm flex flex-col gap-2 font-bold'>
                                    {labprochem[0].phone.map((phone => (
                                        <span key={phone}>{phone}</span>
                                    )))}
                                </p>
                            </div>
                            <div>
                                <h2 className='text-lg font-bold mb-3'>Write Us</h2>
                                <p className='text-sm flex flex-col gap-2 font-bold'>
                                    {labprochem[0].email.map((email => (
                                        <span key={email}>{email}</span>
                                    )))}
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className='bg-primary px-2 md:px-10 text-white '>
                <div className='w-full md:max-w-6xl mx-auto flex flex-col md:flex-row gap-y-3 items-center justify-between  py-5'>
                    <span className='space-x-2'>
                        <span>© 2026</span>
                        <strong>DairyChem Pharma</strong>
                        <span>All Rights Reserved.</span>
                    </span> 
                    <span className='space-x-1'>
                        <a target='_blank' href="https://gotreats.in/"><strong>Powered By :- </strong></a>
                        <span>PulseMedia</span>
                    </span> 
                    <span className='flex items-center gap-6'>
                        <a href={labprochem[0].linkedin} target='_blank'>
                            <img className='w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/id745SkyD0.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                        </a>
                        <a href={labprochem[0].facebook}>
                            <img className='w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idpKX136kp/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                        </a>
                        <a href={labprochem[0].instagram} target="_blank">
                            <img className='w-4 lg:w-5 cursor-pointer' src="https://cdn.brandfetch.io/ido5G85nya/theme/light/idmP9VWUNi.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" /></a>
                        {/* <img className='w-5 cursor-pointer' src="https://cdn.brandfetch.io/idS5WhqBbM/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                        <img className='w-5 cursor-pointer' src="https://cdn.brandfetch.io/idVfYwcuQz/theme/light/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" /> */}
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer