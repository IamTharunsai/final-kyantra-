"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useAI, AIProvider } from "@/contexts/AIContext"; // Ensure AIProvider is imported
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Wrap your DashboardPage component inside AIProvider
export default function DashboardPageWrapper() {
  return (
    <AIProvider>
      <DashboardPage />
    </AIProvider>
  );
}

function DashboardPage() {
  const { user, signOut } = useAuth();
  const { getProfitabilityInsights, getMenuRecommendations } = useAI(); // Now inside AIProvider
  const [businessType, setBusinessType] = useState("restaurant");
  const [orders, setOrders] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [profitabilityInsights, setProfitabilityInsights] = useState("");
  const [menuRecommendations, setMenuRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const setupRealtimeListener = async () => {
      if (user) {
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, where("businessId", "==", user.uid));

        unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersList);

          // Update AI insights
          getProfitabilityInsights(ordersList).then((insights) => {
            setProfitabilityInsights(insights);
          });

          getMenuRecommendations(ordersList).then((recommendations) => {
            setMenuRecommendations(recommendations);
          });

          setLoading(false);
        });

        return () => {
          unsubscribe();
        };
      }
    };

    setupRealtimeListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, getProfitabilityInsights, getMenuRecommendations]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container py-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <Button onClick={handleLogout} className="mt-6 ml-4">
        Logout
      </Button>
    </div>
  );
}
