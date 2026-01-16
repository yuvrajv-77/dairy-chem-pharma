import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Save, Upload } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Product, Category } from '@/types/product'
import { addProduct, getProductById, updateProduct } from '@/services/productsServices'
import { toast } from 'sonner'

// Define the route for this page. The '$productId' part is a dynamic parameter.
// It means this component handles URLs like /admin/products/new or /admin/products/123
export const Route = createFileRoute('/admin/_admin/products/$productId')({
  component: AdminProductDetail,
})

// Categories defined in product.ts. Used for the dropdown selection.
const CATEGORIES: Category[] = ['Capsule', 'Granulation', 'Injectibles', 'Liquid', 'Ointment', 'API']

// Default empty state for a new product.
// We use this to reset the form when creating a brand new item.
const emptyProduct: Product = {
  code: '',
  name: '',
  category: '' as Category, // Cast to Category to satisfy type safety for initial state
  description: '',
  imageUrl: '',
  features: [],
  advantages: [],
  applicationAreas: [],
  specifications: [],
  chart: '',
}

function AdminProductDetail() {
  // Get the productId from the URL (e.g., 'new' or 'some-id')
  const { productId } = Route.useParams()
  const navigate = useNavigate()

  // Determine if we are creating a new product or editing an existing one based on the URL parameter
  const isNew = productId === 'new'
  
  // State to hold all the form data. It follows the 'Product' interface structure.
  const [formData, setFormData] = useState<Product>(emptyProduct)
  // State to hold the actual file object if the user uploads a new image.
  const [imageFile, setImageFile] = useState<File | null>(null)
  // State to hold the actual file object if the user uploads a new chart image.
  const [chartFile, setChartFile] = useState<File | null>(null)

  // Effect to handle initialization: Reset form for new products or fetch data for existing ones
  // This runs whenever 'productId' or 'isNew' changes.
  useEffect(() => {
    // If creating a new product, ensure the form is reset to empty
    if (isNew) {
      setFormData(emptyProduct)
      return
    }
    
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId)
        if (data) {
          setFormData(data as Product)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      }
    }

    fetchProduct()
  }, [productId, isNew])

  // GENERIC HANDLER: Updates simple top-level fields (name, description, etc.)
  // 'keyof Product' ensures 'field' is a valid property name of our Product type.
  const handleChange = (field: keyof Product, value: any) => {
    // We use the functional update form (prev => ...) to ensure we have the latest state.
    // { ...prev } creates a shallow copy of the old state (immutability).
    // [field]: value updates just the specific property dynamically.
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // ARRAY HANDLER: Updates a specific string at a specific index in an array (e.g., features[0]).
  const handleArrayChange = (field: 'features' | 'advantages' | 'applicationAreas', index: number, value: string) => {
    // 1. Create a copy of the array to avoid mutating state directly.
    const newArray = [...formData[field]]
    // 2. Update the item at the specific index.
    newArray[index] = value
    // 3. Update the state with the new array.
    setFormData(prev => ({ ...prev, [field]: newArray }))
  }

  // ADD ITEM: Appends an empty string to an array (features/advantages/etc.)
  // This causes a new input field to appear in the UI.
  const addArrayItem = (field: 'features' | 'advantages' | 'applicationAreas') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  // REMOVE ITEM: Removes an item from an array by its index.
  const removeArrayItem = (field: 'features' | 'advantages' | 'applicationAreas', index: number) => {
    // .filter((_, i) => i !== index) creates a new array excluding the item at 'index'.
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  // SPECIFICATION HANDLER: Updates the label or value of a specification object.
  // Specifications are an array of objects: [{ label: 'Weight', value: '10kg' }]
  const handleSpecChange = (index: number, key: 'label' | 'value', val: string) => {
    // 1. Copy the specifications array.
    const newSpecs = [...formData.specifications]
    // 2. Create a copy of the specific object at that index and update the key (label or value).
    newSpecs[index] = { ...newSpecs[index], [key]: val }
    // 3. Update state.
    setFormData(prev => ({ ...prev, specifications: newSpecs }))
  }

  // ADD SPEC: Adds a new empty specification object.
  const addSpec = () => {
    setFormData(prev => ({ ...prev, specifications: [...prev.specifications, { label: '', value: '' }] }))
  }

  // REMOVE SPEC: Removes a specification object by index.
  const removeSpec = (index: number) => {
    setFormData(prev => ({ ...prev, specifications: prev.specifications.filter((_, i) => i !== index) }))
  }

  // FILE HANDLER: Handles the file input for image upload.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Store the actual File object for uploading later.
      setImageFile(file)
      // Create a temporary local URL to show a preview of the image immediately.
      setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }))
    }
  }

  // CHART FILE HANDLER: Handles the file input for chart image upload.
  const handleChartFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setChartFile(file)
      setFormData(prev => ({ ...prev, chart: URL.createObjectURL(file) }))
    }
  }

  // SAVE HANDLER: Submits the form data to the backend.
  const handleSave = async () => {
    // Basic validation
    if (!formData.name || !formData.category || !formData.description) {
      toast.error('Please fill in all required fields: Name, Category, and Description.')
      return
    }

    const promise = (isNew
      ? addProduct(formData, imageFile || undefined, chartFile || undefined)
      : updateProduct(productId, formData, imageFile || undefined, chartFile || undefined)
    ).then(() => {
      navigate({ to: '/admin/products' })
    })

    toast.promise(promise, {
      loading: isNew ? 'Creating product...' : 'Updating product...',
      success: isNew ? 'Product created successfully' : 'Product updated successfully',
      error: (err) => {
        console.error(isNew ? 'Failed to create product:' : 'Failed to update product:', err)
        return isNew ? 'Failed to create product' : 'Failed to update product'
      },
    })
  }

  return (
    
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg lg:text-2xl font-bold tracking-tight">
            {isNew ? 'Create Product' : 'Edit Product'}
          </h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Basic information about the product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="name" 
                  required
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                  placeholder="e.g. Semi Automatic Capsule Filling Machine"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => handleChange('category', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="id">Product ID/Code (Slug)</Label>
                    <Input 
                        id="id" 
                        value={formData.code} 
                        onChange={(e) => handleChange('code', e.target.value)}
                        disabled={!isNew}
                        placeholder="unique-product-slug / MACH67"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="description" 
                  required
                  value={formData.description} 
                  onChange={(e) => handleChange('description', e.target.value)} 
                  className="min-h-[150px]"
                  placeholder="Detailed product description..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Technical specifications table.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Label</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.specifications.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-2">
                          <Input 
                            value={spec.label} 
                            onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                            placeholder="e.g. Output Capacity"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input 
                            value={spec.value} 
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            placeholder="e.g. 25,000 capsules/hour"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => removeSpec(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" size="sm" onClick={addSpec} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Specification
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={feature} 
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    placeholder="Feature description" autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive"
                    onClick={() => removeArrayItem('features', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('features')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Feature
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Chart</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full relative bg-muted rounded-lg overflow-hidden border flex items-center justify-center min-h-[200px]">
                {formData.chart ? (
                  <>
                    <img src={formData.chart} alt="Chart Preview" className="w-full h-auto object-contain" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, chart: '' }))
                        setChartFile(null)
                        const input = document.getElementById('chartFile') as HTMLInputElement
                        if (input) input.value = ''
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center p-4">
                    <Upload className="h-8 w-8 mb-2" />
                    <span>No chart image</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="chartFile">Upload Chart Image</Label>
                <Input 
                  id="chartFile" 
                  type="file" 
                  accept="image/*"
                  onChange={handleChartFileChange} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Media & Lists */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Advantages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.advantages.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea 
                    value={item} 
                    onChange={(e) => handleArrayChange('advantages', index, e.target.value)}
                    className="min-h-[60px]" autoFocus
                    placeholder="Advantage description"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive mt-1"
                    onClick={() => removeArrayItem('advantages', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('advantages')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Advantage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.applicationAreas.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={item} 
                    onChange={(e) => handleArrayChange('applicationAreas', index, e.target.value)}
                    placeholder="Area name"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 text-destructive"
                    onClick={() => removeArrayItem('applicationAreas', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem('applicationAreas')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Area
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
