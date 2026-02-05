"use client"

import { useEffect, useState, useCallback } from "react"

export function EditMode() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [savedChanges, setSavedChanges] = useState<Record<string, string>>({})

  // Load saved changes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("v0-edit-mode-changes")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSavedChanges(parsed)
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])

  // Apply saved changes when page loads
  useEffect(() => {
    if (Object.keys(savedChanges).length === 0) return

    const applyChanges = () => {
      Object.entries(savedChanges).forEach(([selector, content]) => {
        const element = document.querySelector(selector)
        if (element && element.textContent !== content) {
          element.textContent = content
        }
      })
    }

    // Apply immediately and after a short delay (for dynamic content)
    applyChanges()
    const timeoutId = setTimeout(applyChanges, 500)
    return () => clearTimeout(timeoutId)
  }, [savedChanges])

  // Generate a unique selector for an element
  const getUniqueSelector = useCallback((element: Element): string => {
    if (element.id) {
      return `#${element.id}`
    }

    const path: string[] = []
    let current: Element | null = element

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase()
      
      if (current.className && typeof current.className === "string") {
        const classes = current.className.split(" ").filter(c => c && !c.includes("editable")).slice(0, 2)
        if (classes.length > 0) {
          selector += "." + classes.join(".")
        }
      }

      const parent = current.parentElement
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === current!.tagName)
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1
          selector += `:nth-of-type(${index})`
        }
      }

      path.unshift(selector)
      current = parent
    }

    return path.join(" > ")
  }, [])

  // Handle keyboard shortcut Alt + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault()
        setIsEditMode(prev => !prev)
      }
      
      // Alt + R to reset all changes
      if (e.altKey && e.key.toLowerCase() === "r" && isEditMode) {
        e.preventDefault()
        if (confirm("Tem certeza que deseja resetar todas as alteracoes de texto?")) {
          localStorage.removeItem("v0-edit-mode-changes")
          setSavedChanges({})
          window.location.reload()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEditMode])

  // Add/remove editable attributes when edit mode changes
  useEffect(() => {
    const editableElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, button, li, td, th, label")
    
    editableElements.forEach((element) => {
      const el = element as HTMLElement
      
      // Skip elements that shouldn't be editable
      if (
        el.closest("[data-no-edit]") ||
        el.querySelector("svg") ||
        el.querySelector("img") ||
        el.children.length > 3 ||
        !el.textContent?.trim()
      ) {
        return
      }

      if (isEditMode) {
        el.setAttribute("contenteditable", "true")
        el.classList.add("editable-element")
        el.style.outline = "2px dashed rgba(255, 100, 100, 0.5)"
        el.style.outlineOffset = "2px"
        el.style.cursor = "text"
        el.style.minHeight = "1em"
      } else {
        el.removeAttribute("contenteditable")
        el.classList.remove("editable-element")
        el.style.outline = ""
        el.style.outlineOffset = ""
        el.style.cursor = ""
        el.style.minHeight = ""
      }
    })
  }, [isEditMode])

  // Save changes when user edits content
  useEffect(() => {
    if (!isEditMode) return

    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.hasAttribute("contenteditable")) return

      const selector = getUniqueSelector(target)
      const content = target.textContent || ""

      setSavedChanges(prev => {
        const updated = { ...prev, [selector]: content }
        localStorage.setItem("v0-edit-mode-changes", JSON.stringify(updated))
        return updated
      })
    }

    document.addEventListener("input", handleInput)
    return () => document.removeEventListener("input", handleInput)
  }, [isEditMode, getUniqueSelector])

  // Prevent link navigation in edit mode
  useEffect(() => {
    if (!isEditMode) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a") && target.hasAttribute("contenteditable")) {
        e.preventDefault()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isEditMode])

  if (!isEditMode) return null

  return (
    <div
      className="fixed top-4 right-4 z-[9999] bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3"
      data-no-edit
    >
      <div className="flex flex-col">
        <span className="font-bold text-sm">MODO EDICAO ATIVO</span>
        <span className="text-xs opacity-80">Clique em qualquer texto para editar</span>
      </div>
      <div className="flex flex-col text-xs opacity-70">
        <span>Alt+D: Sair</span>
        <span>Alt+R: Resetar</span>
      </div>
    </div>
  )
}
