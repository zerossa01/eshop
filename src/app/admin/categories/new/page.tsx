/* eslint-disable */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (imageUrl) formData.append('imageUrl', imageUrl);
    
    const res = await createCategory(formData);
    if (res?.error) {
      alert(res.error);
      setLoading(false);
    } else {
      router.push('/admin/categories');
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 border rounded-xl shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input name="name" required className="w-full p-2 border rounded-md bg-background" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input name="slug" required className="w-full p-2 border rounded-md bg-background" placeholder="e.g. summer-collection" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea name="description" className="w-full p-2 border rounded-md bg-background min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Category Image (Optional)</label>
          {imageUrl && <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md mb-2" />}
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ecommerce_uploads"}
            onSuccess={(result: any) => {
              setImageUrl(result.info.secure_url);
            }}
          >
            {({ open }) => (
              <Button type="button" variant="outline" onClick={() => open()}>
                Upload Image
              </Button>
            )}
          </CldUploadWidget>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Category'}
        </Button>
      </form>
    </div>
  );
}
