import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Mail } from 'lucide-react'

export const Route = createFileRoute('/(client)/products/$productId')({
    component: ProductDetailPage,
})

function ProductDetailPage() {
    return (
        <main>
            <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
                <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
                <div className='relative flex items-center justify-center flex-col text-white'>
                    <h1 className='font-extrabold lg:text-5xl text-2xl '>Our Product</h1>
                    <Breadcrumb className='mt-2 '>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbSeparator color='white' />
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-white'>Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <div className='container mx-auto  px-4 lg:px-50 py-10 lg:py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 '>
                    <div className=''>
                        <img className='object-cover h-84 rounded-xl' src="https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg" alt="" />
                    </div>
                    <div className='flex flex-col justify-between gap-5'>
                        <div className='space-y-5 '>
                            <h1 className='text-xl lg:text-2xl font-extrabold capitalize'>SEMI AUTOMATIC CAPSULE FILLING MACHINE</h1>
                            <p className='px-3 py-2 bg-accent rounded-xl inline-flex text-xs font-bold'>Capsule</p>
                            <p className='text-secondary-foreground text-sm text-justify'>A Semi Automatic Capsule Filling Machine is designed to fill hard gelatin or vegetarian
                                capsules with powder, granules, or pellets using a combination of manual loading and
                                automated filling. The machine includes capsule loading, orientation, separation, filling, and
                                locking units, providing higher accuracy and output compared to manual machines. Ideal for
                                medium-scale production, it ensures GMP-compliant, dust-free and efficient capsule
                                manufacturing.
                            </p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button className='flex-1' size={'xl'}>Chat on WhatsApp</Button>
                            <Button className='flex-1' size={'xl'} variant={'outline'}><Mail /> I'm Interested</Button>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 relative'>
                        <aside className='hidden lg:block col-span-1'>
                            <div className='sticky top-24 flex flex-col gap-2 border-l-2 pl-4'>
                                <h3 className='font-bold text-primary mb-2'>On this page</h3>
                                {['Features', 'Advantages', 'Application Area', 'Specifications'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className='text-sm text-secondary-foreground/80 hover:text-primary hover:font-medium transition-colors'
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </aside>
                        <div className='lg:col-span-3 space-y-12'>
                            <section id='features' className='scroll-mt-24'>
                                <h2 className='text-2xl font-bold mb-4'>Features</h2>
                                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {[
                                        'High filling accuracy',
                                        'Easy operation & maintenance',
                                        'GMP compliant design',
                                        'Low noise operation',
                                        'Adjustable speed control',
                                        'Automatic capsule separation'
                                    ].map((feature, i) => (
                                        <li key={i} className='flex items-center gap-2 text-secondary-foreground'>
                                            <div className='h-2 w-2 rounded-full bg-primary' />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section id='advantages' className='scroll-mt-24'>
                                <h2 className='text-2xl font-bold mb-4'>Advantages</h2>
                                <div className='space-y-4 text-secondary-foreground text-justify'>
                                    <p>
                                        Our Semi-Automatic Capsule Filling Machine offers a perfect balance between manual and fully automatic systems.
                                        It significantly increases production capacity while maintaining high precision in dosage.
                                    </p>
                                    <p>
                                        The machine is designed to handle various capsule sizes with easy changeover parts, making it versatile for
                                        different production requirements. Its robust construction ensures longevity and consistent performance.
                                    </p>
                                </div>
                            </section>
                            <section id='application-area' className='scroll-mt-24'>
                                <h2 className='text-2xl font-bold mb-4'>Application Areas</h2>
                                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {[
                                        'Pharmaceutical Industry',
                                        'Nutraceuticals & Food Supplements',
                                        'Ayurvedic & Herbal Medicines',
                                        'R&D Laboratories',
                                        'Pilot Scale Production',
                                        'Cosmetics Industry'
                                    ].map((area, i) => (
                                        <li key={i} className='flex items-center gap-2 text-secondary-foreground'>
                                            <div className='h-2 w-2 rounded-full bg-primary' />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section id='specifications' className='scroll-mt-24'>
                                <h2 className='text-2xl font-bold mb-4'>Technical Specifications</h2>
                                <div className='border rounded-xl overflow-hidden'>
                                    <table className='w-full text-sm text-left'>
                                        <tbody className='divide-y'>
                                            <tr className='bg-secondary/30'>
                                                <td className='p-4 font-semibold w-1/3'>Output Capacity</td>
                                                <td className='p-4'>25,000 - 30,000 capsules/hour</td>
                                            </tr>
                                            <tr>
                                                <td className='p-4 font-semibold'>Capsule Size</td>
                                                <td className='p-4'>00, 0, 1, 2, 3, 4</td>
                                            </tr>
                                            <tr className='bg-secondary/30'>
                                                <td className='p-4 font-semibold'>Power Consumption</td>
                                                <td className='p-4'>2.2 kW</td>
                                            </tr>
                                            <tr>
                                                <td className='p-4 font-semibold'>Dimensions</td>
                                                <td className='p-4'>1500 x 1000 x 1600 mm</td>
                                            </tr>
                                            <tr className='bg-secondary/30'>
                                                <td className='p-4 font-semibold'>Weight</td>
                                                <td className='p-4'>450 kg (Approx.)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </main>
    )
}
