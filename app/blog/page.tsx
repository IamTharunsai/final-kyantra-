"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Search, Edit, Trash, Plus, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  startAfter,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/AuthContext"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  category: string
  image: string
  content: string
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedPost, setEditedPost] = useState<BlogPost | null>(null)
  const [lastVisible, setLastVisible] = useState<any>(null)
  const { user } = useAuth()

  const fetchBlogPosts = async (isInitial = false) => {
    setIsLoading(true)
    const blogCollection = collection(db, "blogPosts")
    let blogQuery = query(blogCollection, orderBy("date", "desc"), limit(9))

    if (!isInitial && lastVisible) {
      blogQuery = query(blogCollection, orderBy("date", "desc"), startAfter(lastVisible), limit(9))
    }

    const blogSnapshot = await getDocs(blogQuery)
    const blogList = blogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BlogPost)

    if (isInitial) {
      setBlogPosts(blogList)
    } else {
      setBlogPosts((prevPosts) => [...prevPosts, ...blogList])
    }

    setLastVisible(blogSnapshot.docs[blogSnapshot.docs.length - 1])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBlogPosts(true)
  }, [])

  const handleLoadMore = () => {
    fetchBlogPosts()
  }

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPost = async () => {
    const newPost: Omit<BlogPost, "id"> = {
      title: "New Post",
      description: "New post description",
      date: new Date().toISOString(),
      category: "General",
      image: "/placeholder.svg",
      content: "New post content",
    }
    const docRef = await addDoc(collection(db, "blogPosts"), newPost)
    setBlogPosts([{ ...newPost, id: docRef.id }, ...blogPosts])
  }

  const handleEditPost = (post: BlogPost) => {
    setEditedPost(post)
    setIsEditing(true)
  }

  const handleUpdatePost = async () => {
    if (editedPost) {
      await updateDoc(doc(db, "blogPosts", editedPost.id), editedPost)
      setBlogPosts(blogPosts.map((post) => (post.id === editedPost.id ? editedPost : post)))
      setIsEditing(false)
      setEditedPost(null)
    }
  }

  const handleDeletePost = async (postId: string) => {
    await deleteDoc(doc(db, "blogPosts", postId))
    setBlogPosts(blogPosts.filter((post) => post.id !== postId))
  }

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href + "/" + post.id,
      })
    }
  }

  if (isLoading && blogPosts.length === 0) {
    return <div className="container py-10 text-center">Loading blog posts...</div>
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[58rem] space-y-6 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Latest Insights</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Stay updated with the latest trends and tips in the food service industry
        </p>
      </motion.div>

      <div className="mt-8 flex justify-between items-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
        {user && (
          <Button onClick={handleAddPost}>
            <Plus className="mr-2 h-4 w-4" /> Add New Post
          </Button>
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id || `post-${index}`} // Fallback to index if id is not available
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="aspect-video w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Badge>{post.category}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={() => setSelectedPost(post)}>
                    Read More
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleShare(post)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                {user && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeletePost(post.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {!isLoading && filteredPosts.length === blogPosts.length && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the blog post.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription id="view-post-description">
              View the full content of the selected blog post.
            </DialogDescription>
          </DialogHeader>
          <img
            src={selectedPost?.image || "/placeholder.svg"}
            alt={selectedPost?.title}
            className="w-full rounded-lg object-cover mb-4"
          />
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedPost?.content || "" }} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the blog post.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription id="edit-post-description">Make changes to the blog post here.</DialogDescription>
          </DialogHeader>
          {editedPost && (
            <div className="space-y-4">
              <Input
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                placeholder="Post Title"
              />
              <Input
                value={editedPost.description}
                onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
                placeholder="Post Description"
              />
              <Input
                value={editedPost.category}
                onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })}
                placeholder="Post Category"
              />
              <Input
                value={editedPost.image}
                onChange={(e) => setEditedPost({ ...editedPost, image: e.target.value })}
                placeholder="Image URL"
              />
              <Textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                placeholder="Post Content"
                rows={10}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdatePost}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

