'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { X } from 'lucide-react';

export function ProductForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    imageUrls.forEach(url => formData.append('imageUrls', url));
    
    const res = await createProduct(formData);
    if (res?.error) {
      alert(res.error);
      setLoading(false);
    } else {
      router.push('/admin/products');
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 border rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input name="name" required className="w-full p-2 border rounded-md bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <input name="slug" required className="w-full p-2 border rounded-md bg-background" placeholder="e.g. basic-tshirt" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price ($)</label>
            <input name="price" type="number" step="0.01" required className="w-full p-2 border rounded-md bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Stock</label>
            <input name="stock" type="number" required className="w-full p-2 border rounded-md bg-background" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select name="categoryId" required className="w-full p-2 border rounded-md bg-background">
            <option value="">Select a category...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea name="description" required className="w-full p-2 border rounded-md bg-background min-h-[100px]" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium block">Images</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative w-24 h-24">
                <img src={url} alt="" className="w-full h-full object-cover rounded-md border" />
                <button type="button" onClick={() => setImageUrls(urls => urls.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ecommerce_uploads"}
            onSuccess={(result: any) => {
              setImageUrls(prev => [...prev, result.info.secure_url]);
            }}
          >
            {({ open }) => (
              <Button type="button" variant="outline" onClick={() => open()}>
                Add Image
              </Button>
            )}
          </CldUploadWidget>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
}
