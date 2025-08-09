'use client'

import { useEffect } from 'react'

interface SmoothScrollAnchorProps {
  anchorId: string
  label?: string
}

export function SmoothScrollAnchor({ anchorId, label }: SmoothScrollAnchorProps) {
  useEffect(() => {
    // Set up smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.getAttribute('href') === `#${anchorId}`) {
        e.preventDefault()
        
        // Find the anchor element
        const anchorElement = document.getElementById(anchorId)
        if (anchorElement) {
          // Smooth scroll to the anchor
          anchorElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
          
          // Update URL without triggering navigation
          window.history.pushState(null, '', `#${anchorId}`)
          
          // Announce to screen readers
          const announcement = document.createElement('div')
          announcement.setAttribute('aria-live', 'polite')
          announcement.setAttribute('aria-atomic', 'true')
          announcement.className = 'sr-only'
          announcement.textContent = `Scrolled to ${label || anchorId}`
          document.body.appendChild(announcement)
          
          setTimeout(() => {
            document.body.removeChild(announcement)
          }, 1000)
        }
      }
    }

    // Add event listener to the document
    document.addEventListener('click', handleAnchorClick)
    
    // Handle initial load if there's a hash in the URL
    if (window.location.hash === `#${anchorId}`) {
      setTimeout(() => {
        const anchorElement = document.getElementById(anchorId)
        if (anchorElement) {
          anchorElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [anchorId, label])

  // Render invisible anchor element
  return (
    <div 
      id={anchorId}
      className="menu-anchor"
      style={{
        display: 'block',
        height: '0',
        overflow: 'hidden',
        position: 'relative',
        top: '-100px' // Offset for fixed headers
      }}
      data-label={label}
      aria-label={`Anchor point: ${label || anchorId}`}
    />
  )
}