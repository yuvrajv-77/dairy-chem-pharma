import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getBlogsFromFirestore, deleteBlog } from '@/services/blogService'
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_admin/blogs/')({
  component: AdminBlogs,
})

export interface Blog {
  id?: string;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
}

function AdminBlogs() {
  const [localBlogs, setLocalBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortAlphabetical, setSortAlphabetical] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogsFromFirestore()
        if (data) {
          setLocalBlogs(data as Blog[])
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        toast.error('Failed to fetch blogs')
      }
    }
    fetchBlogs()
  }, [])

  const filteredBlogs = localBlogs
    .filter((blog) => {
      return blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    .sort((a, b) => (sortAlphabetical ? a.title.localeCompare(b.title) : 0))

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id)
        setLocalBlogs((prev) => prev.filter((b) => b.id !== id))
        toast.success('Blog deleted successfully')
      } catch (error) {
        console.error('Failed to delete blog:', error)
        toast.error('Failed to delete blog')
      }
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSortAlphabetical(false)
  }

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='relative w-full md:w-72'>
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' size={15} />
          <Input
            className='w-full pl-8 h-9'
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="sort-mode"
              checked={sortAlphabetical}
              onCheckedChange={setSortAlphabetical}
            />
            <Label htmlFor="sort-mode" className="whitespace-nowrap text-sm">Sort A-Z</Label>
          </div>
          <Button className="h-9" onClick={() => navigate({ to: "/admin/blogs/$blogId", params: { blogId: "new" } })}>
            <Plus className="mr-2 h-4 w-4" /> Create New Blog
          </Button>
        </div>
      </div>

      {(searchQuery || sortAlphabetical) && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery && (
            <Button variant="secondary" size="sm" className="h-7 text-xs gap-1" onClick={() => setSearchQuery('')}>
              Search: {searchQuery}
              <X className="h-3 w-3" />
            </Button>
          )}
          {sortAlphabetical && (
            <Button variant="secondary" size="sm" className="h-7 text-xs gap-1" onClick={() => setSortAlphabetical(false)}>
              Sorted: A-Z
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Image</TableHead>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <img
                      src={blog.imageUrl || 'https://via.placeholder.co/100'}
                      alt={blog.title}
                      className="h-15 w-15 rounded-md object-cover bg-muted border"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 font-semibold">{blog.title}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate({ to: "/admin/blogs/$blogId", params: { blogId: blog.id! } })}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => blog.id && handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBlogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No blogs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}