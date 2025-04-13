'use client'

import { useState } from "react"
import Sidebar from "@/app/components/sidebar"

export default function Page({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="relative w-full h-screen flex justify-end bg-[url(/bg.webp)] bg-cover bg-center bg-no-repeat">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`relative z-10 h-full bg-white md:rounded-l-4xl transition-all duration-300 overflow-hidden
          ${isSidebarOpen ? "md:w-[80%] xl:w-[85%]" : "w-full md:w-[93%] xl:w-[95%]"}`}
      >
        {children}
      </div>
    </div>
  )
}