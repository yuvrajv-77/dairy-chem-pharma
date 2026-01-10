import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Save, Upload } from 'lucide-react'
import { useState, useEffect } from 'react'
import { addBlogToFirestore, getBlogById, updateBlog } from '@/services/blogService'
import { uploadProductImage } from '@/services/productsServices';
import { toast } from 'sonner'
import ReactQuill from 'react-quill-new';
import type { Blog } from './index'

export const Route = createFileRoute('/admin/_admin/blogs/$blogId')({
    component: AdminBlogDetail,
})

const emptyBlog: Blog = {
    title: '',
    description: '',
    body: '',
    imageUrl: '',
    createdAt: '',
}

function AdminBlogDetail() {
    const { blogId } = Route.useParams()
    const navigate = useNavigate()
    const isNew = blogId === 'new'

    const [formData, setFormData] = useState<Blog>(emptyBlog)
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        if (isNew) {
            setFormData({ ...emptyBlog, createdAt: new Date().toISOString() })
            return
        }

        const fetchBlog = async () => {
            try {
                const data = await getBlogById(blogId)
                if (data) {
                    setFormData(data)
                }
            } catch (error) {
                console.error('Failed to fetch blog:', error)
                toast.error('Failed to fetch blog details')
            }
        }

        fetchBlog()
    }, [blogId, isNew])

    const handleChange = (field: keyof Blog, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImageFile(file)
            setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }))
        }
    }

    const handleSave = async () => {
        if (!formData.title || !formData.body || !formData.description) {
            toast.error('Please fill in Title, Description and Body.')
            return
        }

        let imageUrl = formData.imageUrl
        if (imageFile) {
            try {
                imageUrl = await uploadProductImage(imageFile, "blog-images")
            } catch (e) {
                toast.error("Failed to upload image")
                return
            }
        }

        const dataToSave = { ...formData, imageUrl }

        const promise = (isNew
            ? addBlogToFirestore(dataToSave)
            : updateBlog(blogId, dataToSave)
        ).then(() => {
            navigate({ to: '/admin/blogs' })
        })

        toast.promise(promise, {
            loading: isNew ? 'Creating blog...' : 'Updating blog...',
            success: isNew ? 'Blog created successfully' : 'Blog updated successfully',
            error: 'Failed to save blog',
        })
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    return (
        <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/admin/blogs">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isNew ? 'Create Blog Post' : 'Edit Blog Post'}
                    </h1>
                </div>
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Blog Content</CardTitle>
                            <CardDescription>Write your blog post here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="Blog Title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                                <Textarea
                                    id="description"
                                    required
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Short description for the blog card"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Content <span className="text-destructive">*</span></Label>
                                <div className="prose-sm">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.body}
                                        onChange={(value) => handleChange('body', value)}
                                        modules={modules}
                                        className="h-[400px] mb-12"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-video relative bg-muted rounded-lg overflow-hidden border flex items-center justify-center">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-muted-foreground flex flex-col items-center">
                                        <Upload className="h-8 w-8 mb-2" />
                                        <span>No image</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageFile">Upload Image</Label>
                                <Input
                                    id="imageFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
