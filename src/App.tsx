import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BackToTop } from './components/BackToTop'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { BookCallPage } from './pages/BookCallPage'
import { CancelBookingPage } from './pages/CancelBookingPage'
import { ContactPage } from './pages/ContactPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AgencySolutionsPage } from './pages/AgencySolutionsPage'
import { AIAutomationPage } from './pages/AIAutomationPage'
import { CjisBookingPage } from './pages/CjisBookingPage'
import { ContestPlatformsPage } from './pages/ContestPlatformsPage'
import { HomePage } from './pages/HomePage'
import { InventorySystemsPage } from './pages/InventorySystemsPage'
import { LivestockSoftwarePage } from './pages/LivestockSoftwarePage'
import { MarbleSemenCaseStudy } from './pages/MarbleSemenCaseStudy'
import { QATestingPage } from './pages/QATestingPage'

function App() {
  const { pathname, hash } = useLocation()
  const isAdminRoute = pathname.startsWith('/admin')

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'site-main site-main--admin' : 'site-main'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookCallPage />} />
          <Route path="/book/cancel" element={<CancelBookingPage />} />
          <Route path="/livestock-software" element={<LivestockSoftwarePage />} />
          <Route path="/contest-platforms" element={<ContestPlatformsPage />} />
          <Route path="/inventory-systems" element={<InventorySystemsPage />} />
          <Route path="/cjis-booking" element={<CjisBookingPage />} />
          <Route path="/qa-testing" element={<QATestingPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/agency-solutions" element={<AgencySolutionsPage />} />
          <Route path="/ai-automation" element={<AIAutomationPage />} />
          <Route path="/case-study/marblesemen" element={<MarbleSemenCaseStudy />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop hideOnContact={pathname === '/contact'} />}
    </>
  )
}

export default App
