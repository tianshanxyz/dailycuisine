import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import Home from './pages/Home'
import Planning from './pages/Planning'
import Shopping from './pages/Shopping'
import Profile from './pages/Profile'
import DishDetail from './pages/DishDetail'
import SearchPage from './pages/SearchPage'
import UserPreferences from './pages/UserPreferences'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="planning" element={<Planning />} />
            <Route path="shopping" element={<Shopping />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dish/:id" element={<DishDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="preferences" element={<UserPreferences />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
