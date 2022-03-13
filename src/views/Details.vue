<template>
  <p>Title : {{ GStore.recipe.title }}</p>
  <img :src="image" />
  <div class="FS">
    <div class="size">
      <Fieldset legend="Ingredients">
        <div class="text">
          <p>{{ GStore.recipe.ingredient }}</p>
        </div>
      </Fieldset>
    </div>
  </div>
  <div class="FS">
    <div class="size">
      <Fieldset legend="Instruction">
        <div class="text">
          <p>{{ GStore.recipe.instruction }}</p>
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['GStore'],
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: require('@/assets/image/' + this.GStore.recipe.image)
    }
  }
}
</script>
<style scoped>
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
.FS {
  text-align: left;
  margin-top: 5%;
}

.size {
  padding-left: 10%;
  padding-right: 10%;
}

.text {
  text-align: center;
}
img {
  width: 500px;
}
</style>
