"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, userType: string, businessType?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError(null)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
    }
  }

  const signUp = async (email: string, password: string, name: string, userType: string, businessType?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        userType,
        businessType: userType === "business" ? businessType : null,
      })

      setError(null)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setError(null)
      router.push("/")
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
  )
}

