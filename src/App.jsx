import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from '@/pages/onboarding/Splash'
import OnboardingSlider from '@/pages/onboarding/OnboardingSlider'
import Auth from '@/pages/auth/Auth'
import Gender from '@/pages/setup/Gender'
import HabitPicker from '@/pages/setup/HabitPicker'
import Home from '@/pages/home/Home'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import CGU from '@/pages/legal/CGU'
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy'
import HabitDetail from '@/pages/habits/HabitDetail'
import HabitEdit from '@/pages/habits/HabitEdit'
import GoogleCallback from '@/pages/auth/GoogleCallback'
import HabitCreate from '@/pages/habits/HabitCreate'
export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Splash />} />
        <Route path="/onboarding/slides" element={<OnboardingSlider />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/setup/gender" element={<Gender />} />
        <Route path="/setup/habits" element={<HabitPicker />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/habits/:id" element={<HabitDetail />} />
        <Route path="/habits/:id/edit" element={<HabitEdit />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/create-habit" element={<HabitCreate />} />
      </Routes>
    </div>
  )
} 