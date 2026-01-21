import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus, Search, Pencil, Trash2, Filter, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Product as ClientProduct, Category } from '@/types/product'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getProducts, deleteProduct } from '@/services/productsServices'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/_admin/products/')({
  component: AdminProducts,
})

interface Product extends ClientProduct {
  status: 'Active' | 'Draft'
}

function AdminProducts() {
  const [localProducts, setLocalProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortAlphabetical, setSortAlphabetical] = useState(false)
  // State to track which categories are selected for filtering
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const navigate = useNavigate()
  const uniqueCategories = Array.from(new Set(localProducts.map((p) => p.category)))

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        // Map Firestore data to local Product interface, defaulting status to 'Active'
        const formattedProducts = data.map((item: any) => ({
          ...item,
          status: item.status || 'Active'
        })) as Product[]
        setLocalProducts(formattedProducts)
        console.log('Fetched products:', formattedProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])

  // Filter and sort products based on state
  const filteredProducts = localProducts
    .filter((product) => {
      // If no categories are selected, show all products.
      // Otherwise, check if the product's category is in the selected list.
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => (sortAlphabetical ? a.name.localeCompare(b.name) : 0))

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        setLocalProducts((prev) => prev.filter((p) => p.id !== id))
        toast.success('Product deleted successfully')
      } catch (error) {
        console.error('Failed to delete product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSortAlphabetical(false)
    setSelectedCategories([])
  }

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto space-y-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='relative w-full md:w-72'>
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' size={15} />
          <Input
            className='w-full pl-8 h-9'
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
            <Switch
              id="sort-mode"
              checked={sortAlphabetical}
              onCheckedChange={setSortAlphabetical}
            />
            <Label htmlFor="sort-mode" className="whitespace-nowrap text-sm">Sort A-Z</Label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
                {selectedCategories.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary w-4 h-4 text-[10px] flex items-center justify-center text-primary-foreground">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories((prev) =>
                      checked
                        // If checked, add the category to the array
                        ? [...prev, category]
                        // If unchecked, remove the category from the array
                        : prev.filter((c) => c !== category)
                    )
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="h-9" onClick={() => navigate({ to: "/admin/products/$productId", params: { productId: "new" } })}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
        </div>
       
      </div>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || searchQuery || sortAlphabetical) && (
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
          {selectedCategories.map((cat) => (
            <Button key={cat} variant="secondary" size="sm" className="h-7 text-xs gap-1" onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}>
              {cat}
              <X className="h-3 w-3" />
            </Button>
          ))}
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
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.code}>
                  <TableCell>
                    <img
                      src={product.imageUrl || 'https://via.placeholder.co/100'}
                      alt={product.name}
                      className="h-15 w-15 lowercase rounded-md object-cover bg-muted border"
                    />
                  </TableCell>
                  <TableCell className="">
                    <div className="line-clamp-2 font-semibold">{product.name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate({ to: "/admin/products/$productId", params: { productId: product.id || product.code } })}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        // onClick={() => product.id && handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No products found.
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