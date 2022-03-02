<template>
  <label v-if="label">{{ label }}</label>
  <input
    class="field"
    :placeholder="label"
    :value="modelValue"
    @input="inputHandler($query)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    inputHandler(query) {
      this.$emit('update:modelValue', query.target.value)
    }
  }
}
</script>
