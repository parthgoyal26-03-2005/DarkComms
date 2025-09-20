import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const url = "/"

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(

  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        userButtonPopoverCard: {
          zIndex: 9999,
        },
      },
    }}
    signInForceRedirectUrl={url}
    signUpForceRedirectUrl={url}
    afterSignOutUrl={url}
  >
    <App />
  </ClerkProvider >,
)