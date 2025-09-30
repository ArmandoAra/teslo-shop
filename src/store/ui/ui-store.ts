'use client'
import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean
    isLoggedIn: boolean
    admin: boolean

    setLoggedIn: (value: boolean) => void
    setAdmin: (value: boolean) => void
    openSideMenu: () => void
    closeSideMenu: () => void
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    isLoggedIn: false,
    admin: false,

    setAdmin: (value: boolean) => set({ admin: value }),
    setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),
}))