import { defineStore } from 'pinia'
import type { User } from '@/types/types'

interface State {
  user: User
  isLoggedIn: boolean
}

export const useRiStore = defineStore('riStore', {
  state: (): State => ({
    user: {
      id: 1,
      firstName: 'Jonathan',
      lastName: 'Sarmiento',
      email: 'jhonnsarmiento@gmail.com',
      photoUrl: 'https://i.ibb.co/3zHGVfz/profile-Photo.png'
    },
    isLoggedIn: false
  }),
  getters: {
    getUser(state) {
      return state.user
    },
    getLoginStatus(state) {
      return state.isLoggedIn
    }
  },
  actions: {
    addUser(newUser: User) {
      this.user = newUser
    },
    loginUser() {
      this.isLoggedIn = true
      return
    }
  }
})
