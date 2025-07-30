import React, { useState } from 'react'
import { Sun, Moon, Menu, Search } from 'lucide-react';
import { useParams, Link, NavLink } from 'react-router-dom';


export default function Navbar({ currentTheme, cycleTheme }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-25 bg-brand-primary text-text-body flex items-center justify-between p-2 h-14">
      <button onClick={cycleTheme} className='cursor-pointer text-brand-accent'>
        {currentTheme === 'dark' ? <Sun /> : <Moon />}
      </button>
      <div className="flex items-center gap-x-5 text-brand-accent">
        {/* need to sustitute with a search bar */}
        <div className='cursor-pointer'>
          <Search />
        </div>
        <button className='cursor-pointer' onClick={() => setOpenSidebar(!openSidebar)}>
          <Menu size={32} />
        </button>
      </div>

      {openSidebar && ( // Use && for cleaner conditional rendering
        <>
          {/* Overlay for background dimming - click to close */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setOpenSidebar(false)}
          ></div>

          <nav
            className={`
              fixed top-0 right-0 h-full w-64 bg-surface text-text-body shadow-lg p-6
              transform transition-transform duration-300 ease-in-out z-50
              ${openSidebar ? 'translate-x-0' : 'translate-x-full'}
              md:hidden {/* Hide on medium and larger screens */}
            `}
          >
            <button
              onClick={() => setOpenSidebar(false)}
              className="cursor-pointer absolute top-4 right-4 text-text-body text-2xl" // Adjust close button color
            >
              &times; {/* Close button (X icon) */}
            </button>
            <ul className="flex flex-col space-y-4 mt-10">
              <li onClick={() => setOpenSidebar(false)}>
                <Link
                  to="/" className="block text-lg hover:text-brand-accent"
                >
                  Inicio
                </Link  >
              </li>
              <li onClick={() => setOpenSidebar(false)}>
                <Link
                  to="/courses" className="block text-lg hover:text-brand-accent"
                >
                  Cursos
                </Link  >
              </li>
            </ul>
          </nav>
        </>
      )}

    </header>
  )
}
