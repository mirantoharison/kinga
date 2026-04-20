import { Routes, Route } from "react-router-dom"

// Pages
import MapView from "@/pages/MapView"
import CreateRidePage from "@/pages/CreateRide"
import ListRidePage from "@/pages/ListRide"
import PaymentPage from "./pages/Payment"
import DashboardPage from "./pages/Dashboard"
import DiscussionPage from "./pages/Discussion"
import MessagesListPage from "./pages/ListDiscussion"
import MessagesArchivedPage from "./pages/ListDiscussionArchived"
import NotificationsPage from "./pages/ListNotification"
import ReviewsPage from "./pages/ListReviews"
import LoginPage from "./pages/Login"

// (optionnel pour plus tard)
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-6">{title}</div>
)

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Navigation */}
      <Route path="/" element={<MapView />} />
      <Route path="/home" element={<DashboardPage />} />
      <Route path="/ride/search" element={<ListRidePage />} />
      <Route path="/ride/create" element={<CreateRidePage />} />

      {/* Mes trajets */}
      <Route path="/bookings" element={<Placeholder title="Mes réservations" />} />
      <Route path="/my-rides" element={<Placeholder title="Mes trajets" />} />
      <Route path="/history" element={<Placeholder title="Historique" />} />

      {/* Communication */}
      <Route path="/messages/:rideId" element={<DiscussionPage />} />
      <Route path="/messages/archived" element={<MessagesArchivedPage />} />
      <Route path="/messages" element={<MessagesListPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />

      {/* Paiements */}
      <Route path="/payments" element={<PaymentPage />} />
      <Route path="/wallet" element={<Placeholder title="Portefeuille" />} />

      {/* Paramètres */}
      <Route path="/settings" element={<Placeholder title="Paramètres" />} />
      <Route path="/help" element={<Placeholder title="Aide" />} />
      <Route path="/about" element={<Placeholder title="À propos" />} />
    </Routes>
  )
}