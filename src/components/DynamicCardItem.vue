<script lang="ts">
import { h } from 'vue'

export default {
  props: {
    templateModel: {
      type: String,
      default: ''
    },
  },

  setup(props) {
    return () => h('div', { class: 'card', innerHTML: props.templateModel })
  }
}
</script>