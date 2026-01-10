import { createFileRoute } from '@tanstack/react-router'
import { CalendarRange } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getBlogById } from '@/services/blogService'
import type { Blog } from '@/routes/admin/_admin/blogs/index'

export const Route = createFileRoute('/(client)/_layout/blogs/$blogId')({
  component: BlogPage,
})

function BlogPage() {
  const { blogId } = Route.useParams()
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(blogId)
        if (data) {
          setPost(data)
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [blogId])

  if (loading) {
    return <div className='container mx-auto px-4 py-10 text-center text-2xl font-bold'>Loading...</div>
  }
  
  if (!post) {
    return <div className='container mx-auto px-4 py-10 text-center text-2xl font-bold'>Blog post not found</div>
  }

  return (
    <main className='container mx-auto px-4 lg:px-60 py-10'>
      <h1 className='text-xl md:text-3xl lg:text-5xl font-extrabold mb-6 text-slate-900'>{post.title}</h1>

      <div className='flex items-center text-slate-500 text-sm gap-2 mb-8'>
        <CalendarRange size={16} />
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <img
        src={post.imageUrl}
        alt={post.title}
        className='w-full h-64 lg:h-[500px] object-cover rounded-xl mb-10 shadow-sm'
      />

      <div 
        className='flex flex-col text-start gap-6 text-slate-700 leading-relaxed text-lg [&_img]:max-w-full [&_img]:h-auto [&_iframe]:max-w-full break-words'
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </main>
  )
}

export default BlogPage