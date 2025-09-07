import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePlanner=create(persist(
    ((set) => ({
        tasks: [],
        filterTasks: [],
        addTask: (payload) => set((state) => ({
            filterTasks: [...state.tasks, payload]
        })),
        deleteTask: (id) => set((state) => ({
            filterTasks: state.tasks.filter((task) => task.id!==id)
        })),
        updateStatus: (id, status) => set((state) => ({
            filterTasks: state.tasks.filter((task) => {
                if (task.id===id)
                    task.status=status

                return task

            })
        })),
        deleteAllTask: () => set(() => ({
            tasks: [],
            filterTasks: [],

        })),

        dateSearch: (date) => set((state) => ({
            filterTasks: state.tasks.filter((task) => task.createdAt===date)
        })),

        updateTasks: (payload) => set((state) => ({
            filterTasks: state.tasks.map((task) =>
                task.id===payload.id? { ...task, ...payload }:task
            ),

        }))



    })),
    { name: "Planner" }
))

