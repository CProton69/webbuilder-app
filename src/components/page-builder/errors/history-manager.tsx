'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface HistoryState {
  elements: any[]
  timestamp: number
  description: string
}

interface HistoryContextType {
  history: HistoryState[]
  currentIndex: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  pushState: (elements: any[], description?: string) => void
  clearHistory: () => void
  getHistoryPanel: () => JSX.Element
  getCurrentState: () => any[]
  onStateRestore?: (elements: any[]) => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

const MAX_HISTORY = 50

export function HistoryProvider({ children, onStateRestore }: { children: React.ReactNode; onStateRestore?: (elements: any[]) => void }) {
  const [history, setHistory] = useState<HistoryState[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  const pushState = useCallback((elements: any[], description: string = 'State change') => {
    const newState: HistoryState = {
      elements: JSON.parse(JSON.stringify(elements)), // Deep clone
      timestamp: Date.now(),
      description
    }

    setHistory(prev => {
      // Remove any states after current index (for when we undo and then make new changes)
      const newHistory = prev.slice(0, currentIndex + 1)
      
      // Add new state
      newHistory.push(newState)
      
      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY)
      }
      
      return newHistory
    })
    
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (canUndo) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      if (onStateRestore && history[newIndex]) {
        onStateRestore(history[newIndex].elements)
      }
    }
  }, [canUndo, currentIndex, history, onStateRestore])

  const redo = useCallback(() => {
    if (canRedo) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      if (onStateRestore && history[newIndex]) {
        onStateRestore(history[newIndex].elements)
      }
    }
  }, [canRedo, currentIndex, history, onStateRestore])

  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
  }, [])

  const getCurrentState = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < history.length) {
      return history[currentIndex].elements
    }
    return []
  }, [history, currentIndex])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' && e.shiftKey || e.key === 'y')) {
        e.preventDefault()
        redo()
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        // Save functionality could be added here
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const HistoryPanel = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">History</h3>
        <div className="flex gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-1">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-4 text-xs">
            No history yet
          </div>
        ) : (
          history.map((state, index) => (
            <div
              key={state.timestamp}
              className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                index === currentIndex
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{state.description}</span>
                <span className="text-gray-500 ml-2">
                  {new Date(state.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {history.length > 0 && (
        <div className="pt-2 border-t">
          <button
            onClick={clearHistory}
            className="w-full text-xs text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  )

  const value: HistoryContextType = {
    history,
    currentIndex,
    canUndo,
    canRedo,
    undo,
    redo,
    pushState,
    clearHistory,
    getHistoryPanel: HistoryPanel,
    getCurrentState,
    onStateRestore
  }

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}

// Hook for components to easily track changes
export function useChangeTracker<T>(
  value: T,
  onChange: (newValue: T) => void,
  description?: string
) {
  const { pushState } = useHistory()
  const [previousValue, setPreviousValue] = useState(value)

  const handleChange = useCallback((newValue: T) => {
    if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
      pushState(newValue, description || 'Value changed')
      setPreviousValue(newValue)
    }
    onChange(newValue)
  }, [onChange, previousValue, pushState, description])

  return handleChange
}