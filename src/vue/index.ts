import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ExampleTemp from '@components/ExampleTemp.vue'

const app = createApp({
  components: {
    ExampleTemp,
  },
})

app.use(createPinia())

app.mount('#app')
