import { defineStore } from 'pinia'
import { useHelperStore } from "@/stores/helper";
import ptcg from '@/services/ptcg'
import type { Card } from "@/types/Card";
import type { DeckVariants } from "@/types/DeckVariants";

function filterDeckList(deck_list: string) {
  const helperStore = useHelperStore()
  return deck_list.split('\n')
      .filter(card => card.substring(0, 2) == '* ' || helperStore.isNumber(card.substring(0, 1)))
      .map(card => card.replace('* ', ''))
}

function getDeckCards(full_deck_list: Array<string>, deck_variants: DeckVariants): Array<Card> {
  const deck_list: Array<Card> = []
  full_deck_list.forEach(card_text => {
    const basic_card = getCardInfo(card_text)
    const card_variants = deck_variants[basic_card.name]
    const card_obj = card_variants.find(card => basic_card.set_code === card.set.ptcgoCode && basic_card.set_number === card.number)
    if (typeof card_obj === 'object') {
      card_obj.quantity = basic_card.quantity
      deck_list.push(card_obj)
    }
  })
  return deck_list
}

function getCardInfo(card: string) {
  return {
    name: getCardName(card),
    quantity: getCardQtd(card),
    set_number: getCardSetNumber(card),
    set_code: getCardSetCode(card),
  }
}
function getCardName(card: string): string {
  const card_info = card.split(' ')
  return card_info.splice(1, card_info.length - 3).join(' ')
}
function getCardQtd(card: string): number {
  return parseInt(card.split(' ')[0])
}
function getCardSetCode(card: string): string {
  const card_info = card.split(' ')
  return card_info.splice(card_info.length - 2, 1).join(' ')
}
function getCardSetNumber(card: string): string {
  const card_info = card.split(' ')
  return card_info.splice(card_info.length - 1, 1).join(' ')
}

export const useDeckStore = defineStore({
  id: 'deck',
  state: () => ({
    deck_list: null as Array<Card> | null,
    deck_variants: null as DeckVariants | null
  }),
  getters: {
    get_deck_list: (state) => state.deck_list,
    get_deck_variants: (state) => state.deck_variants,
  },
  actions: {
    /**
     * Get Deck List Object
     * @param {string} raw_deck_list
     */
    getDeck(raw_deck_list: string) {
      const filtered_deck_list = filterDeckList(raw_deck_list)
      console.log(filtered_deck_list)
      return new Promise((resolve, reject) => {
        ptcg.get(`/get_deck_cards`, { params: { deck_list: filtered_deck_list.join(';') } } ).then(response => {
          const deck_variants = response.data
          try {
            const deck_list = getDeckCards(filtered_deck_list, deck_variants)
            this.$patch({ deck_list, deck_variants })
            resolve(response)
          } catch (error) {
            reject(error)
          }
        }).catch(error => reject(error.response))
      })
    },
  }
})
