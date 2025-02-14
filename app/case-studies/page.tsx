"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Building2, Truck, UtensilsCrossed, Search, Edit, Trash, Plus } from "lucide-react"
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
  where,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CaseStudy {
  id: string
  title: string
  description: string
  type: string
  icon: string
  metrics: string[]
  fullContent: string
}

const iconMap = {
  Building2: Building2,
  Truck: Truck,
  UtensilsCrossed: UtensilsCrossed,
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedStudy, setEditedStudy] = useState<CaseStudy | null>(null)
  const [lastVisible, setLastVisible] = useState<any>(null)
  const [filter, setFilter] = useState("all")
  const { user } = useAuth()

  const fetchCaseStudies = async (isInitial = false) => {
    setIsLoading(true)
    const caseStudiesCollection = collection(db, "caseStudies")
    let caseStudiesQuery = query(caseStudiesCollection, orderBy("title"), limit(9))

    if (filter !== "all") {
      caseStudiesQuery = query(caseStudiesQuery, where("type", "==", filter))
    }

    if (!isInitial && lastVisible) {
      caseStudiesQuery = query(caseStudiesQuery, startAfter(lastVisible))
    }

    const caseStudiesSnapshot = await getDocs(caseStudiesQuery)
    const caseStudiesList = caseStudiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as CaseStudy)

    if (isInitial) {
      setCaseStudies(caseStudiesList)
    } else {
      setCaseStudies((prevStudies) => [...prevStudies, ...caseStudiesList])
    }

    setLastVisible(caseStudiesSnapshot.docs[caseStudiesSnapshot.docs.length - 1])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCaseStudies(true)
  }, [filter, fetchCaseStudies])

  const handleLoadMore = () => {
    fetchCaseStudies()
  }

  const filteredStudies = caseStudies.filter(
    (study) =>
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStudy = async () => {
    const newStudy: Omit<CaseStudy, "id"> = {
      title: "New Case Study",
      description: "New case study description",
      type: "restaurant",
      icon: "UtensilsCrossed",
      metrics: ["Metric 1", "Metric 2"],
      fullContent: "New case study content",
    }
    const docRef = await addDoc(collection(db, "caseStudies"), newStudy)
    setCaseStudies([{ ...newStudy, id: docRef.id }, ...caseStudies])
  }

  const handleEditStudy = (study: CaseStudy) => {
    setEditedStudy(study)
    setIsEditing(true)
  }

  const handleUpdateStudy = async () => {
    if (editedStudy) {
      await updateDoc(doc(db, "caseStudies", editedStudy.id), editedStudy)
      setCaseStudies(caseStudies.map((study) => (study.id === editedStudy.id ? editedStudy : study)))
      setIsEditing(false)
      setEditedStudy(null)
    }
  }

  const handleDeleteStudy = async (studyId: string) => {
    await deleteDoc(doc(db, "caseStudies", studyId))
    setCaseStudies(caseStudies.filter((study) => study.id !== studyId))
  }

  if (isLoading && caseStudies.length === 0) {
    return <div className="container py-10 text-center">Loading case studies...</div>
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[58rem] space-y-6 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Success Stories</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">See how businesses are transforming with Kyantra</p>
      </motion.div>

      <div className="mt-8 flex justify-between items-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search case studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="restaurant">Restaurants</SelectItem>
            <SelectItem value="foodTruck">Food Trucks</SelectItem>
            <SelectItem value="sharedKitchen">Shared Kitchens</SelectItem>
          </SelectContent>
        </Select>
        {user && (
          <Button onClick={handleAddStudy}>
            <Plus className="mr-2 h-4 w-4" /> Add New Case Study
          </Button>
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-3">
        {filteredStudies.map((study, index) => {
          const IconComponent = iconMap[study.icon as keyof typeof iconMap]
          return (
            <motion.div
              key={study.id || `study-${index}`} // Fallback to index if id is not available
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    <CardTitle>{study.title}</CardTitle>
                  </div>
                  <CardDescription>{study.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {study.metrics.map((metric, metricIndex) => (
                      <div key={`${study.id}-metric-${metricIndex}`} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedStudy(study)}>
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  {user && (
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditStudy(study)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteStudy(study.id)}>
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

      {!isLoading && filteredStudies.length === caseStudies.length && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}

      <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the case study.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>{selectedStudy?.title}</DialogTitle>
            <DialogDescription id="view-case-study-description">
              View the full content of the selected case study.
            </DialogDescription>
          </DialogHeader>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedStudy?.fullContent || "" }} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
        <DialogContent aria-describedby="dialog-description">
          <DialogDescription id="dialog-description" className="sr-only">
            This dialog contains additional information or actions related to the case study.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Edit Case Study</DialogTitle>
            <DialogDescription id="edit-case-study-description">Make changes to the case study here.</DialogDescription>
          </DialogHeader>
          {editedStudy && (
            <div className="space-y-4">
              <Input
                value={editedStudy.title}
                onChange={(e) => setEditedStudy({ ...editedStudy, title: e.target.value })}
                placeholder="Case Study Title"
              />
              <Input
                value={editedStudy.description}
                onChange={(e) => setEditedStudy({ ...editedStudy, description: e.target.value })}
                placeholder="Case Study Description"
              />
              <Select
                value={editedStudy.type}
                onValueChange={(value) => setEditedStudy({ ...editedStudy, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Case Study Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="foodTruck">Food Truck</SelectItem>
                  <SelectItem value="sharedKitchen">Shared Kitchen</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={editedStudy.icon}
                onValueChange={(value) => setEditedStudy({ ...editedStudy, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Building2">Building</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="UtensilsCrossed">Utensils</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={editedStudy.metrics.join("\n")}
                onChange={(e) => setEditedStudy({ ...editedStudy, metrics: e.target.value.split("\n") })}
                placeholder="Metrics (one per line)"
                rows={5}
              />
              <Textarea
                value={editedStudy.fullContent}
                onChange={(e) => setEditedStudy({ ...editedStudy, fullContent: e.target.value })}
                placeholder="Full Content"
                rows={10}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateStudy}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

