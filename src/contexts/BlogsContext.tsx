import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getBlogsFromFirestore } from '@/services/blogService';
import type { Blog } from '@/routes/admin/_admin/blogs/index';

interface BlogsContextType {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  refreshBlogs: () => Promise<void>;
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export const BlogsProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogsFromFirestore();
      if (data) {
        setBlogs(data as Blog[]);
      }
    } catch (err: any) {
      console.error('Error fetching blogs in context:', err);
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ blogs, loading, error, refreshBlogs: fetchBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
};