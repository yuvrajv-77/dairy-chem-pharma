import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/contexts/ProductsContext'

import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/(client)/_layout/products/')({
    component: ProductsIndexPage,
    /**
     * Validate search query and return a validated search object.
     * If search.query is not present or is empty, returns 'All'.
     * @param {Record<string, unknown>} search - The search query object.
     * @returns {{ filter: string }} - The validated search object.
     */
    validateSearch: (search: Record<string, unknown>) => {
        return {
            filter: (search.filter as string) || 'All',
        }
    },
})

const categories = [
    'All',
    'Capsule',
    'Granulation',
    'Injectibles',
    'Liquid',
    'Ointment',
]



/**
 * Renders the products index page.
 *
 * This page displays a list of products based on the search filter.
 * If the filter is 'All', it displays all products.
 * Otherwise, it filters the products by category.
 *
 * The page also includes a breadcrumb navigation and a category filter.
 *
 * @returns {JSX.Element} The products index page.
 */
function ProductsIndexPage() {
    const { filter } = Route.useSearch()
    const navigate = Route.useNavigate()
    const { products } = useProducts()

    const filteredProducts = useMemo(() => {
        return filter === 'All'
            ? products
            : products.filter((product) => product.category === filter)
    }, [filter, products])

    return (
        <main>
            <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
                <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
                <div className='relative flex items-center justify-center flex-col text-white'>
                    <h1 className='font-extrabold lg:text-5xl text-2xl '>Our Products</h1>
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
                <div className=''>
                    <span className='text-center space-y-3'>
                        <h1 className='text-2xl lg:text-4xl font-extrabold'>Our Machinery and Services</h1>
                        <p className='text-sm text-gray-500'>Innovative and Reliable Equipment</p>
                    </span>
                </div>
                <div className='flex flex-row gap-4 mt-5 overflow-x-auto pb-2'>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => navigate({ search: { filter: category } })}
                            className={`py-2 px-4 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === category
                                ? 'bg-black text-white'
                                : 'bg-accent hover:bg-accent/80'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className='bg-secondary shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden cursor-pointer ' onClick={() => navigate({ to: '/products/$productId', params: { productId: String(product.id) } })}>
                            <div className='h-50  rounded-md mb-2 flex items-center justify-center'>
                                <img className='h-full object-cover' src={product.imageUrl} alt="" />
                            </div>
                            <div className='p-4 space-y-3'>
                                <h2 className='text-xl font-bold'>{product.name}</h2>
                                <p className='text-xs text-gray-500  uppercase tracking-wide'>{product.category}</p>
                                <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                                <div className='flex justify-between items-center'>
                                    <Button className=''>Inquire Now</Button>
                                    <Button variant={'secondary'} className=''>View Details</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
