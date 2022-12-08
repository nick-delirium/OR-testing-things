<script>
import { defineComponent } from 'vue'
import { useCounterStore, useCounterStore2 } from './store'
import Tracker from '@openreplay/tracker'
import vuexTracker from '@openreplay/tracker-vuex'

const tracker = new Tracker({
  __DISABLE_SECURE_MODE: true,
  projectKey: "",
  // projectKey: "",
  ingestPoint: "https://foss.openreplay.com:3939/ingest",
  // ingestPoint: "https://ee.openreplay.com/ingest",
  verbose: true,
  __debug__: true,
  onStart: () => {
    tracker.setUserID('123123');
  },
})

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()
    const store2 = useCounterStore2()

    tracker.start()
    const vuexPlugin = tracker.use(vuexTracker())

    const counterStorePlugin = vuexPlugin('counterStorePlugin')
    const plugin2 = vuexPlugin('store123')

    counterStorePlugin(counterStore)
    plugin2(store2)

    function incrementButton() {
      console.log('hi')
      counterStore.increment()
      store2.increment()
      console.log(counterStore.count)
    }

    return {
      counterStore,
      incrementButton
    }
  }
})
</script>

<template>
  <div class="card">
    <button type="button" @click="incrementButton">count is {{ counterStore.count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
