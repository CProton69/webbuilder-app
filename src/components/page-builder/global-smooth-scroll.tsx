'use client'

import { useEffect } from 'react'

export function GlobalSmoothScroll() {
  useEffect(() => {
    // Handle all anchor links globally
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')
      
      if (link) {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault()
          
          const anchorId = href.substring(1)
          const anchorElement = document.getElementById(anchorId)
          
          if (anchorElement) {
            // Smooth scroll to the anchor
            anchorElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
            
            // Update URL without triggering navigation
            window.history.pushState(null, '', href)
            
            // Add active class to the link
            document.querySelectorAll('a[href^="#"]').forEach(l => {
              l.classList.remove('active')
            })
            link.classList.add('active')
            
            // Announce to screen readers
            const announcement = document.createElement('div')
            announcement.setAttribute('aria-live', 'polite')
            announcement.setAttribute('aria-atomic', 'true')
            announcement.className = 'sr-only'
            announcement.textContent = `Scrolled to section ${anchorId}`
            document.body.appendChild(announcement)
            
            setTimeout(() => {
              document.body.removeChild(announcement)
            }, 1000)
          } else {
            console.warn(`Anchor element with id "${anchorId}" not found`)
          }
        }
      }
    }

    // Handle initial load if there's a hash in the URL
    const handleInitialHash = () => {
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        const anchorId = hash.substring(1)
        const anchorElement = document.getElementById(anchorId)
        
        if (anchorElement) {
          setTimeout(() => {
            anchorElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }, 100)
        }
      }
    }

    // Add event listeners
    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('load', handleInitialHash)
    handleInitialHash() // Also check immediately

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('load', handleInitialHash)
    }
  }, [])

  return null // This component doesn't render anything
}