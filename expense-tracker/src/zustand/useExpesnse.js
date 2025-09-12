import { create } from "zustand";
import { persist } from "zustand/middleware"

export const useExpense=create(persist(
    (set) => ({
        expenses: [],
        filterExpense: [],
        setExpense: (payload) => set((state) => ({
            expenses: [...state.expenses, payload]
        })),
        deleteExpense: (id) => set((state) => ({
            expenses: state.expenses.filter(item => item.id!==id)
        })),
        updateExpense: (id, payload) => set((state) => ({
            expenses: state.expenses.map((item) => {
                if (item.id===id)
                    return {
                        ...item,
                        ...payload
                    }
            })


        })),

        search: (payload) => set((state) => ({
            filterExpense: payload.title? state.expenses:state.expenses.filter((item) => (item?.title||"").toLowerCase().includes(payload.title.toLowerCase())
            )
        }))

    }),
    { name: "expenses" }
))