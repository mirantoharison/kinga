import { Routes, Route } from "react-router-dom"

// Layouts
import { AppLayout } from "@/components/layout/App"
import { AuthLayout } from "@/components/layout/Auth"

// Pages
import MapView from "@/pages/MapView"
import CreateRidePage from "@/pages/CreateRide"
import ListRidePage from "@/pages/ListRide"
import PaymentPage from "@/pages/Payment"
import DashboardPage from "@/pages/Dashboard"
import DiscussionPage from "@/pages/Discussion"
import MessagesListPage from "@/pages/ListDiscussion"
import MessagesArchivedPage from "@/pages/ListDiscussionArchived"
import NotificationsPage from "@/pages/ListNotification"
import ReviewsPage from "@/pages/ListReviews"
import LoginPage from "@/pages/Login"

// Placeholder
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-6">{title}</div>
)

// 🔹 helper pour éviter répétition
const withAppLayout = (Component: React.ReactNode) => (
  <AppLayout>{Component}</AppLayout>
)

export default function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      {/* APP */}
      <Route path="/" element={withAppLayout(<MapView />)} />
      <Route path="/home" element={withAppLayout(<DashboardPage />)} />
      <Route path="/ride/search" element={withAppLayout(<ListRidePage />)} />
      <Route path="/ride/create" element={withAppLayout(<CreateRidePage />)} />

      {/* Mes trajets */}
      <Route path="/bookings" element={withAppLayout(<Placeholder title="Mes réservations" />)} />
      <Route path="/my-rides" element={withAppLayout(<Placeholder title="Mes trajets" />)} />
      <Route path="/history" element={withAppLayout(<Placeholder title="Historique" />)} />

      {/* Communication */}
      <Route path="/messages/:rideId" element={withAppLayout(<DiscussionPage />)} />
      <Route path="/messages/archived" element={withAppLayout(<MessagesArchivedPage />)} />
      <Route path="/messages" element={withAppLayout(<MessagesListPage />)} />
      <Route path="/notifications" element={withAppLayout(<NotificationsPage />)} />
      <Route path="/reviews" element={withAppLayout(<ReviewsPage />)} />

      {/* Paiements */}
      <Route path="/payments" element={withAppLayout(<PaymentPage />)} />
      <Route path="/wallet" element={withAppLayout(<Placeholder title="Portefeuille" />)} />

      {/* Paramètres */}
      <Route path="/settings" element={withAppLayout(<Placeholder title="Paramètres" />)} />
      <Route path="/help" element={withAppLayout(<Placeholder title="Aide" />)} />
      <Route path="/about" element={withAppLayout(<Placeholder title="À propos" />)} />

    </Routes>
  )
}