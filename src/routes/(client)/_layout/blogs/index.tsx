import { useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CalendarRange } from 'lucide-react'
import { useBlogs } from '@/contexts/BlogsContext'
import type { Blog } from '@/routes/admin/_admin/blogs/index'

// Temporary export to satisfy imports in other files that might still reference BLOG_POSTS.
export const BLOG_POSTS: Blog[] = []

export const Route = createFileRoute('/(client)/_layout/blogs/')({
    component: Blogs,
})

function Blogs() {
    const { blogs, loading } = useBlogs()
    const navigate = useNavigate();

    const sortedBlogs = useMemo(() => {
        return [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }, [blogs])

    const featuredPost = sortedBlogs[0]
    const smallPosts = sortedBlogs.slice(1, 4)

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

                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : sortedBlogs.length === 0 ? (
                        <div className="text-center py-10">No blogs found.</div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            <div className=''>
                                {featuredPost && (
                                    <article className='flex flex-col gap-3  cursor-pointer group' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: featuredPost.id! } })}>
                                        <img src={featuredPost.imageUrl || 'https://via.placeholder.co/600x400'} alt={featuredPost.title} className='w-full h-64 lg:h-80 object-cover rounded-lg group-hover:scale-101 transition-all' />
                                        <h2 className='text-2xl font-extrabold line-clamp-2 group-hover:underline'>{featuredPost.title}</h2>
                                        <p className='text-slate-600 text-sm line-clamp-2 '>{featuredPost.description}</p>
                                        <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />{new Date(featuredPost.createdAt).toLocaleDateString()}</p>
                                    </article>
                                )}
                            </div>
                            <div className='flex flex-col gap-6  justify-between'>
                                {smallPosts.map((post) => (
                                    <article key={post.id} className='flex gap-4 group cursor-pointer ' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: post.id! } })}>
                                        <img src={post.imageUrl || 'https://via.placeholder.co/150'} alt={post.title} className='w-46 h-35 object-cover rounded-lg  group-hover:scale-101 transition-all' />
                                        <div className='flex flex-col justify-between'>
                                            <h2 className='font-bold text-lg line-clamp-2 group-hover:underline'>{post.title}</h2>
                                            <p className='text-sm text-gray-600 line-clamp-2'>{post.description}</p>
                                            <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
                <section className='mt-10'>
                    <div className=' flex items-center justify-between mb-5'>
                        <h2 className='text-2xl font-extrabold'>Featured Blogs</h2>
                        {/* <Button>Read More</Button> */}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {sortedBlogs.slice(0, 3).map((post) => (
                            <article key={post.id} className='flex flex-col gap-3 cursor-pointer group' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: post.id! } })}>
                                <img src={post.imageUrl || 'https://via.placeholder.co/400x300'} alt={post.title} className='w-full h-60 object-cover rounded-lg group-hover:scale-101 transition-all' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xl font-bold line-clamp-2 group-hover:underline'>{post.title}</h3>
                                    <p className='text-slate-600 text-sm line-clamp-3'>{post.description}</p>
                                    <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </article>
                        ))}
                    </div>


                </section>
            </div>
        </main>
    )
}
