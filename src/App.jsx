import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from '@/pages/onboarding/Splash'
import OnboardingSlider from '@/pages/onboarding/OnboardingSlider'
import Auth from '@/pages/auth/Auth'
import Gender from '@/pages/setup/Gender'
import HabitPicker from '@/pages/setup/HabitPicker'
import Home from '@/pages/home/Home'
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
      </Routes>
    </div>
  )
} 