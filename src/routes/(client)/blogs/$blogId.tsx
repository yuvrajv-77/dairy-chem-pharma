import { createFileRoute } from '@tanstack/react-router'
import { BLOG_POSTS } from './index'
import { CalendarRange } from 'lucide-react'

export const Route = createFileRoute('/(client)/blogs/$blogId')({
  component: BlogPage,
})

function BlogPage() {
  const { blogId } = Route.useParams()
  const post = BLOG_POSTS.find((p) => p.id === Number(blogId))

  if (!post) {
    return <div className='container mx-auto px-4 py-10 text-center text-2xl font-bold'>Blog post not found</div>
  }

  return (
    <main className='container mx-auto px-4 lg:px-70 py-10'>
      <h1 className='text-xl md:text-3xl lg:text-5xl font-extrabold mb-6 text-slate-900'>{post.title}</h1>

      <div className='flex items-center text-slate-500 text-sm gap-2 mb-8'>
        <CalendarRange size={16} />
        <span>October, 15, 2022</span>
      </div>

      <img
        src={post.image}
        alt={post.title}
        className='w-full h-64 lg:h-[500px] object-cover rounded-xl mb-10 shadow-sm'
      />

      <div className='flex flex-col gap-6 text-slate-700 leading-relaxed text-lg'>
      
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </main>
  )
}

export default BlogPage