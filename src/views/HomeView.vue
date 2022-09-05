<template>
  <main>
    <form @submit.prevent="getDeckList" v-if="!deck_list">
      <div class="row">
        <div class="col-12 mt-2">
          <textarea class="form-control" v-model="raw_deck_list" style="height: 700px;width: 100%;" placeholder="Insert your PTCG Online/Live generated list here"></textarea>
        </div>
        <div class="col-12 mt-2">
          <button class="btn btn-primary">Enviar lista</button>
        </div>
      </div>
    </form>
    <div class="pkmn-deck" v-else>
      <div class="pkmn-card" v-for="card in deck_list" :key="card.id">
        <img :src="card.images.large" alt="" class="card-img">
        <div class="card-qtd">{{ card.quantity }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDeckStore } from "@/stores/deck";

export default defineComponent({
  setup() {
    const deckStore = useDeckStore();
    const raw_deck_list = ref('');

    function getDeckList() {
      deckStore.getDeck(raw_deck_list.value)
    }

    // @ts-ignore
    window.stores = { deckStore }

    return {
      raw_deck_list,
      deckStore,
      getDeckList,
    };
  },
  computed: {
    deck_list() {
      return this.deckStore.get_deck_list
    },
    deck_variants() {
      return this.deckStore.get_deck_variants
    },
  }
});
</script>