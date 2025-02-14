"use client"

import { useState, useEffect } from "react"
import { Book, FileText, Lightbulb, Settings, Search, Edit, Trash, Plus } from "lucide-react"
import Link from "next/link"
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
  increment,
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CustomPagination } from "@/components/custom-pagination"

interface DocSection {
  id: string
  title: string
  description: string
  icon: string
  links: { title: string; content: string }[]
  helpful?: number
  notHelpful?: number
}

const iconMap = {
  Book: Book,
  FileText: FileText,
  Lightbulb: Lightbulb,
  Settings: Settings,
}

export default function DocsPage() {
  const [docSections, setDocSections] = useState<DocSection[]>([])
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; content: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSection, setEditedSection] = useState<DocSection | null>(null)
  const sectionsPerPage = 8
  const { user } = useAuth()

  useEffect(() => {
    const fetchDocSections = async () => {
      const docSectionsCollection = collection(db, "docSections")
      const docSectionsQuery = query(docSectionsCollection, orderBy("title"), limit(50))
      const docSectionsSnapshot = await getDocs(docSectionsQuery)
      const docSectionsList = docSectionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as DocSection)
      setDocSections(docSectionsList)
      setIsLoading(false)
    }

    fetchDocSections()
  }, [])

  const filteredSections = docSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.links.some((link) => link.title.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const indexOfLastSection = currentPage * sectionsPerPage
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage
  const currentSections = filteredSections.slice(indexOfFirstSection, indexOfLastSection)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleAddSection = async () => {
    const newSection: Omit<DocSection, "id"> = {
      title: "New Documentation Section",
      description: "New section description",
      icon: "Book",
      links: [{ title: "New Link", content: "New link content" }],
    }
    const docRef = await addDoc(collection(db, "docSections"), newSection)
    setDocSections([...docSections, { ...newSection, id: docRef.id }])
  }

  const handleEditSection = (section: DocSection) => {
    setEditedSection(section)
    setIsEditing(true)
  }

  const handleUpdateSection = async () => {
    if (editedSection) {
      await updateDoc(doc(db, "docSections", editedSection.id), editedSection)
      setDocSections(docSections.map((section) => (section.id === editedSection.id ? editedSection : section)))
      setIsEditing(false)
      setEditedSection(null)
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    await deleteDoc(doc(db, "docSections", sectionId))
    setDocSections(docSections.filter((section) => section.id !== sectionId))
  }

  const handleFeedback = async (sectionId: string, isHelpful: boolean) => {
    const sectionRef = doc(db, "docSections", sectionId)
    const field = isHelpful ? "helpful" : "notHelpful"
    await updateDoc(sectionRef, {
      [field]: increment(1),
    })
    setDocSections(
      docSections.map((section) => (section.id === sectionId ? { ...section, [field]: section[field] + 1 } : section)),
    )
  }

  if (isLoading) {
    return <div className="container py-10 text-center">Loading documentation...</div>
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[58rem] space-y-6 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Documentation</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">Everything you need to know about using Kyantra</p>
      </motion.div>

      <div className="mt-8 flex justify-between items-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
        {user && (
          <Button onClick={handleAddSection}>
            <Plus className="mr-2 h-4 w-4" /> Add New Section
          </Button>
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentSections.map((section, index) => {
          const IconComponent = iconMap[section.icon as keyof typeof iconMap]
          return (
            <motion.div
              key={section.id || `section-${index}`} // Fallback to index if id is not available
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={`${section.id}-link-${linkIndex}`}>
                        <Button
                          variant="link"
                          className="text-sm text-muted-foreground hover:text-primary hover:underline"
                          onClick={() => setSelectedDoc(link)}
                        >
                          {link.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {user && (
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditSection(section)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteSection(section.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8">
        <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredSections.length / sectionsPerPage)}
          onPageChange={paginate}
        />
      </div>

      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the documentation.
          </DialogDescription>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedDoc?.content || "" }} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the documentation.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Edit Documentation Section</DialogTitle>
            <DialogDescription id="edit-section-description">
              Make changes to the documentation section here.
            </DialogDescription>
          </DialogHeader>
          {editedSection && (
            <div className="space-y-4">
              <Input
                value={editedSection.title}
                onChange={(e) => setEditedSection({ ...editedSection, title: e.target.value })}
                placeholder="Section Title"
              />
              <Input
                value={editedSection.description}
                onChange={(e) => setEditedSection({ ...editedSection, description: e.target.value })}
                placeholder="Section Description"
              />
              <Input
                value={editedSection.icon}
                onChange={(e) => setEditedSection({ ...editedSection, icon: e.target.value })}
                placeholder="Icon (Book, FileText, Lightbulb, or Settings)"
              />
              {editedSection.links.map((link, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    value={link.title}
                    onChange={(e) => {
                      const newLinks = [...editedSection.links]
                      newLinks[index].title = e.target.value
                      setEditedSection({ ...editedSection, links: newLinks })
                    }}
                    placeholder="Link Title"
                  />
                  <Textarea
                    value={link.content}
                    onChange={(e) => {
                      const newLinks = [...editedSection.links]
                      newLinks[index].content = e.target.value
                      setEditedSection({ ...editedSection, links: newLinks })
                    }}
                    placeholder="Link Content"
                    rows={5}
                  />
                </div>
              ))}
              <Button
                onClick={() =>
                  setEditedSection({
                    ...editedSection,
                    links: [...editedSection.links, { title: "New Link", content: "New link content" }],
                  })
                }
              >
                Add New Link
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateSection}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mx-auto mt-20 max-w-[58rem] space-y-6 text-center">
        <h2 className="text-3xl font-bold">Need Help?</h2>
        <p className="text-lg text-muted-foreground">Our support team is here to assist you</p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}

