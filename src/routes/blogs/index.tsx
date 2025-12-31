import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CalendarRange } from 'lucide-react'

export const Route = createFileRoute('/blogs/')({
    component: Blogs,
})

export const BLOG_POSTS = [
    {
        id: 1,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 2,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 3,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 4,
        title: "Small Blog Title 3",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 5,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 6,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 7,
        title: "Detailed description of the featured blog post Detailed description of the",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
    {
        id: 8,
        title: "Small Blog Title 3",
        description: "Detailed description of the featured blog post. This section takes up more space to highlight the most important news or article. Detailed description of the  featured blog post. This section takes up more space to highlight the most important news or article.",
        image: "https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg",
    },
]

function Blogs() {
    const featuredPost = BLOG_POSTS[0]
    const smallPosts = BLOG_POSTS.slice(1, 4)

    const navigate = useNavigate();
    return (
        <main>
            <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
                <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
                <div className='relative flex items-center justify-center flex-col text-white'>
                    <h1 className='font-extrabold lg:text-5xl text-2xl '>Blogs</h1>
                    <Breadcrumb className='mt-2 '>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbSeparator color='white' />
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-white'>Blogs</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <div className='container mx-auto  px-4 lg:px-50 py-10 lg:py-10'>
                <section>
                    <div className=' flex items-center justify-between mb-5'>
                        <h2 className='text-2xl font-extrabold'>Latest Blogs</h2>
                        {/* <Button>Read More</Button> */}
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className=''>
                            <article className='flex flex-col gap-3  cursor-pointer group' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: String(featuredPost.id) } })}>
                                <img src={featuredPost.image} alt={featuredPost.title} className='w-full h-64 lg:h-80 object-cover rounded-lg group-hover:scale-101 transition-all' />
                                <h2 className='text-2xl font-extrabold line-clamp-2 group-hover:underline'>{featuredPost.title}</h2>
                                <p className='text-slate-600 text-sm line-clamp-2 '>{featuredPost.description}</p>
                                <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />October, 15, 2022</p>
                            </article>
                        </div>
                        <div className='flex flex-col gap-6  justify-between'>
                            {smallPosts.map((post) => (
                                <article key={post.id} className='flex gap-4 group cursor-pointer ' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: String(post.id) } })}>
                                    <img src={post.image} alt={post.title} className='w-46 h-35 object-cover rounded-lg  group-hover:scale-101 transition-all' />
                                    <div className='flex flex-col justify-between'>
                                        <h2 className='font-bold text-lg line-clamp-2 group-hover:underline'>{post.title}</h2>
                                        <p className='text-sm text-gray-600 line-clamp-2'>{post.description}</p>
                                        <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />October, 15, 2022</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                </section>
                <section className='mt-10'>
                    <div className=' flex items-center justify-between mb-5'>
                        <h2 className='text-2xl font-extrabold'>Featured Blogs</h2>
                        {/* <Button>Read More</Button> */}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {BLOG_POSTS.slice(0, 3).map((post) => (
                            <article key={post.id} className='flex flex-col gap-3 cursor-pointer group' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: String(post.id) } })}>
                                <img src={post.image} alt={post.title} className='w-full h-60 object-cover rounded-lg group-hover:scale-101 transition-all' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xl font-bold line-clamp-2 group-hover:underline'>{post.title}</h3>
                                    <p className='text-slate-600 text-sm line-clamp-3'>{post.description}</p>
                                    <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />October, 15, 2022</p>
                                </div>
                            </article>
                        ))}
                    </div>


                </section>
            </div>
        </main>
    )
}
