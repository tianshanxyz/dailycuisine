import { Outlet, NavLink } from 'react-router-dom'
import { Home, Calendar, ShoppingCart, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Layout() {
  const navItems = [
    { to: '/', icon: Home, label: '首页' },
    { to: '/planning', icon: Calendar, label: '规划' },
    { to: '/shopping', icon: ShoppingCart, label: '采购' },
    { to: '/profile', icon: User, label: '我的' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
