import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import { getProductById } from '@/services/productsServices'


export const Route = createFileRoute('/(client)/_layout/products/$productId')({
    component: ProductDetailPage,
})

function ProductDetailPage() {
    const { productId } = Route.useParams()
    const navigate = useNavigate()
    const [productData, setProductData] = useState<Product>({
        code: '',
        name: '',
        category: '' as any, // Default or initial category
        description: '',
        imageUrl: '',
        features: [],
        advantages: [],
        applicationAreas: [],
        specifications: []
    })

    useEffect(() => {
        // Scroll to the top of the page when the component mounts or the productId changes
        window.scrollTo(0, 0);

        // Define an asynchronous function to fetch product details from the backend
        const fetchProductDetails = async () => {
            try {
                // Attempt to fetch the product data using the service function
                const data = await getProductById(productId);

                // If data is successfully returned, update the local state
                if (data) {
                    // Cast the data to the Product type and update state
                    setProductData(data as Product);
                }
            } catch (error) {
                // Log any errors that occur during the fetch operation
                console.error("Failed to fetch product details:", error);
            }
        };

        // Invoke the fetch function
        fetchProductDetails();
    }, [productId]); // Dependency array ensures this runs only when productId changes
    
    const sections = [
        { id: 'features', label: 'Features', hasData: productData.features?.length > 0 },
        { id: 'advantages', label: 'Advantages', hasData: productData.advantages?.length > 0 },
        { id: 'application-area', label: 'Application Area', hasData: productData.applicationAreas?.length > 0 },
        { id: 'specifications', label: 'Specifications', hasData: productData.specifications?.length > 0 },
    ];

    const handleWhatsAppEnquiry = () => {
        const phoneNumber = '919876543210' // Replace with your WhatsApp number
        const message = `Hello, I am interested in ${productData.name}`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <main>
            <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
                <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
                <div className='relative flex items-center justify-center flex-col text-white'>
                    <h1 className='font-extrabold lg:text-5xl text-2xl'>Our Product</h1>
                    <Breadcrumb className='mt-2 '>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbSeparator color='white' />
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products" className='text-white'>Products</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbSeparator color='white' />
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-white'>{productData.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <div className='container mx-auto  px-4 lg:px-50 py-10 lg:py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 '>
                    <div className=''>
                        <img className='object-cover h-84 rounded-xl' src={productData.imageUrl} alt={productData.name} />
                    </div>
                    <div className='flex flex-col justify-between gap-5'>
                        <div className='space-y-5 '>
                            <h1 className='text-xl lg:text-2xl font-extrabold capitalize'>{productData.name}</h1>
                            <p className='px-3 py-2 bg-accent rounded-xl inline-flex text-xs font-bold'>{productData.category}</p>
                            <p className='text-secondary-foreground text-sm text-justify'>{productData.description}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button className='flex-1' size={'xl'} onClick={handleWhatsAppEnquiry}>Chat on WhatsApp</Button>
                            {/* <Button className='flex-1' size={'xl'} variant={'outline'}><Mail /> I'm Interested</Button> */}
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 relative'>
                        <aside className='hidden lg:block col-span-1'>
                            <div className='sticky top-24 flex flex-col gap-2 border-l-2 pl-4'>
                                <h3 className='font-bold text-primary mb-2'>On this page</h3>
                                {sections.filter(s => s.hasData).map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className='text-sm text-secondary-foreground/80 hover:text-primary hover:font-medium transition-colors'
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </aside>
                        <div className='lg:col-span-3 space-y-12'>
                            {productData.features?.length > 0 && (
                                <section id='features' className='scroll-mt-24'>
                                    <h2 className='text-2xl font-bold mb-4'>Features</h2>
                                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {productData.features.map((feature, i) => (
                                            <li key={i} className='flex items-center gap-2 text-secondary-foreground'>
                                                <div className='h-2 w-2 rounded-full bg-primary' />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {productData.advantages?.length > 0 && (
                                <section id='advantages' className='scroll-mt-24'>
                                    <h2 className='text-2xl font-bold mb-4'>Advantages</h2>
                                    <div className='space-y-4 text-secondary-foreground text-justify'>
                                        {productData.advantages.map((advantage, i) => (
                                            <p key={i}>{advantage}</p>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {productData.applicationAreas?.length > 0 && (
                                <section id='application-area' className='scroll-mt-24'>
                                    <h2 className='text-2xl font-bold mb-4'>Application Areas</h2>
                                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {productData.applicationAreas.map((area, i) => (
                                            <li key={i} className='flex items-center gap-2 text-secondary-foreground'>
                                                <div className='h-2 w-2 rounded-full bg-primary' />
                                                {area}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {productData.specifications?.length > 0 && (
                                <section id='specifications' className='scroll-mt-24'>
                                    <h2 className='text-2xl font-bold mb-4'>Technical Specifications</h2>
                                    <div className='border rounded-xl overflow-hidden'>
                                        <table className='w-full text-sm text-left'>
                                            <tbody className='divide-y'>
                                                {productData.specifications.map((spec, i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-secondary/30' : ''}>
                                                        <td className='p-4 font-semibold w-1/3'>{spec.label}</td>
                                                        <td className='p-4'>{spec.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </main>
    )
}
