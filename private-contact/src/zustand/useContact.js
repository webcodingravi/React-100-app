import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const useContact = create(persist(
    (set)=>({
        contacts: [],
        setContact:(payload)=>set((state)=>({
             contacts: [...state.contacts,payload]
        }))
    }),
    {name:"contact"}
))