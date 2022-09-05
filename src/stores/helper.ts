import { defineStore } from 'pinia'

export const useHelperStore = defineStore({
  id: 'helper',
  actions: {
    isNumber(str: string) {
      if (typeof str !== 'string') {
        return false;
      }

      if (str.trim() === '') {
        return false;
      }

      return !isNaN(Number(str));
    }
  }
})
