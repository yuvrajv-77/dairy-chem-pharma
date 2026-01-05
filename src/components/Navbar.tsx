import React from 'react'
import { CheckSquare2, Mail, Menu, Phone, PhoneCall, Search, X } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { motion, AnimatePresence } from "motion/react";
import dairychem from '../data/dairychem.json';
import logo from '../assets/logo.jpeg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useProducts } from '@/contexts/ProductsContext'

const Navbar = () => {
    const navigate = useNavigate();
    const { products } = useProducts();
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)

    const categories = React.useMemo(() => {
        return [...new Set(products?.map((product: any) => product.category))].filter(Boolean).slice(0, 6)
    }, [products])

    console.log(products);

    return (
        <header className='bg-white  border-gray-800 z-40'>
            <div className=' '>

                {/* <div className='bg-primary py-2 md:py-1 px-4 md:px-10 lg:px-0'>
                    <div className='md:max-w-6xl text-white  mx-auto  flex items-center justify-between '>
                        <Link to={"mailto:" + dairychem[0].email} className='hidden md:flex text-sm items-center gap-2 font-bold '> <Mail size={15} />
                            {dairychem[0].email}</Link>
                        <span className='w-50 relative md:w-70 border rounded-lg cursor-text text-xs md:text-base flex items-center gap-3 justify-center text-white/80 h-6  md:h-7 border-white/60'  >
                            <Search size={15} /> Search 7000+ Chemicals
                        </span>

                        <span className='flex items-center gap-6'>
                            <img className='w-4 lg:w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/id745SkyD0.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <img className='w-4 lg:w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idpKX136kp/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <a href="https://www.instagram.com/dairychem?igsh=bnc5dGdoZm5uM212ZQ" target="_blank"><img className='w-4 lg:w-5 cursor-pointer' src="https://cdn.brandfetch.io/ido5G85nya/theme/light/idmP9VWUNi.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" /></a>
                            <img className='w-4 lg:w-5 cursor-pointer' src="https://cdn.brandfetch.io/idS5WhqBbM/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <img className='w-5 cursor-pointer' src="https://cdn.brandfetch.io/idVfYwcuQz/theme/light/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                        </span>
                    </div>
                </div> */}

                {/* brand */}
                <div className='px-3 lg:px-0 my-3  lg:max-w-6xl mx-auto flex md:flex-row flex-col items-center  justify-between '>
                    <div className='flex  w-full lg:w-auto items-center justify- gap-2' >
                        <Button size={'icon'} className='bg-primary lg:hidden text-white ' type='button' onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                            <Menu size={23} />
                        </Button>
                        <Link to={"/"} className='flex items-center gap-2'>
                            <span className='  border-primary p-1'>
                                <img src={logo} className='size-14' alt="" />
                            </span>
                            <span>
                                <h1 className='text-lg md:text-2xl font-black text-primary'>DairyChem Pharma Machineries</h1>
                                <span className='flex gap-2'>
                                    <p className='text-[9px] font-semibold md:text-xs'>Mira Road, Surat, Gujarat - 402125 </p>
                                    <p className='text-[9px] font-semibold md:text-xs'>|</p>
                                    <p className='text-[9px] flex gap-1 font-semibold md:text-xs'>GSTIN: <p className='font-bold'>27AAGCS0001Q1ZJ </p></p>
                                </span>
                            </span>
                        </Link>

                    </div>

                    {/* Mobile Navigation Drawer */}
                    <AnimatePresence>
                        {isMobileNavOpen && (
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                                className="fixed top-0 left-0 z-50 w-screen h-full bg-primary shadow-lg flex flex-col"
                            >
                                <div className="flex  items-center justify-between p-4 border-b">
                                    <div className="flex items-center gap-2">
                                        <span className='border border-primary p-1'>
                                            <img src="/Brand Logo.png" className='size-10 rounded-sm' alt="" />
                                        </span>
                                        <h1 className='text-lg font-extrabold text-white'>DairyChem Pharma Machineries</h1>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => setIsMobileNavOpen(false)}
                                        aria-label="Close menu"
                                    >
                                        <X size={21} />
                                    </Button>
                                </div>
                                <nav className="flex flex-col gap-6 p-4">
                                    {/* {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                            onClick={() => setIsMobileNavOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))} */}
                                    <Link
                                        to={'/'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={'/about'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        About
                                    </Link>
                                    {/* <Link
                                        to={'/companies'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Companies
                                    </Link> */}
                                    <Link
                                        to={'/blogs'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Blogs
                                    </Link>

                                    <Accordion type="single" className='' collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-white focus:bg-violet-400 font-semibold py-2 text-base px-2 rounded hover:bg-violet-400">Laboratory Chemicals</AccordionTrigger>
                                            <AccordionContent className='bg-violet-500 p-4 text-primary flex flex-col gap-2 rounded-b-lg'>
                                                {/* <Link
                                                    to={'/chemicals'}
                                                    className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                                    onClick={() => setIsMobileNavOpen(false)}
                                                >
                                                    All Chemicals
                                                </Link>
                                                <Link
                                                    to={'/categories'}
                                                    className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                                    onClick={() => setIsMobileNavOpen(false)}
                                                >
                                                    By Category
                                                </Link> */}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {/* <Link
                                        to={'/events'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Events
                                    </Link> */}
                                    {/* <Link
                                        to={'/gallery'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Gallery
                                    </Link> */}
                                    <Link
                                        to={'/contact'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Contact
                                    </Link>

                                </nav>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    <div className='flex mx-auto md:mx-0 item-center md:gap-10 md:mt-0 mt-5 gap-4 text-[8px] md:text-base'>

                        <span className='flex flex-col items-start md:items-end font-semibold'>
                            <p className='flex items-center gap-1'><CheckSquare2 size={20} /> Certified</p>
                            <p>Certificate Name</p>
                        </span>

                        <Button size={'lg'}><PhoneCall size={20} /> +234 1 234 5678</Button>
                        <Button size={'lg'}>Enquire Now</Button>


                    </div>
                </div>



                {/* navigation */}
                <nav className='w-full bg-primary hidden lg:block'>
                    <div className='max-w-6xl mx-auto flex items-center justify-between  py-3'>
                        <NavigationMenu viewport={false} className=''>
                            <NavigationMenuList className=' text-white' >

                                <NavigationMenuItem className=''>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/about">About</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                    <NavigationMenuContent className='z-10'>
                                        <ul className='grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                            {categories.map((category: any) => (
                                                <li key={category}>
                                                    <div className="text-sm font-bold mb-2 leading-none">{category}</div>
                                                    {products?.filter((p: any) => p.category === category).map((product: any) => (
                                                        <NavigationMenuLink asChild key={product._id}>
                                                            <Link
                                                                to="/products/$productId"
                                                                params={{ productId: product.id }}
                                                                className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{product.name}</div>
                                                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                                                    {product.description}
                                                                </p>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </li>
                                            ))}
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        to="/products"
                                                        search={{ filter: '' }}
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-gray-50"
                                                    >
                                                        <div className="text-sm font-medium leading-none">All Products</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                            Browse all machinery
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/blogs" params={{}}>Blogs</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/gallery">Policies</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem> */}

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/contact">Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/admin">admin</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>


                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className='relative w-50 md:w-70'>
                            <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-white/80' size={15} />
                            <Input className='w-full pl-8 h-8 text-xs md:text-base bg-transparent border-white/60 text-white placeholder:text-white/80 rounded-lg' placeholder="Search 30+ Products" />
                        </div>
                        {/* <Link to="/chemicals" className='text-white p-2 hover:bg-white rounded-lg hover:text-black cursor-pointer'><Search size={20} /></Link> */}
                    </div>
                </nav>




            </div>


        </header>
    )
}

export default Navbar