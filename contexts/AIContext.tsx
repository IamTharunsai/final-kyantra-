"use client"

import type React from "react"
import { createContext, useContext } from "react"

type AIContextType = {
  getProfitabilityInsights: (data: any) => Promise<string>
  getMenuRecommendations: (data: any) => Promise<string[]>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getProfitabilityInsights = async (data: any) => {
    // This is where you'd integrate with your AI service
    // For now, we'll return a placeholder response
    return "Based on your current data, consider adjusting your menu prices and reducing food waste to improve profitability."
  }

  const getMenuRecommendations = async (data: any) => {
    // This is where you'd integrate with your AI service
    // For now, we'll return placeholder recommendations
    return ["Add seasonal specials", "Introduce a plant-based option", "Create a signature dish"]
  }

  return (
    <AIContext.Provider value={{ getProfitabilityInsights, getMenuRecommendations }}>{children}</AIContext.Provider>
  )
}

