<template>
  <!-- card lessons -->
  <div>
    
    <div v-for="lesson in sortedLesson">
      <b-container class="bv-example-row mt-3 mr-2">
        <b-row>
          <b-col>
            <b-card :title="lesson.title" v-bind:img-src="lesson.image" img-top style="max-width: 250px" tag="article"
              class="mb-2 ">
              <b-card-text>
                Places:
                <span v-if="lesson.spaces > 0">{{ lesson.spaces }}</span>
                <span v-else>Spaces Sold Out</span><br>    <!-- print message   -->
                Location:{{ lesson.location }}<br>
                Price:£{{ lesson.price }}
              </b-card-text>
              <b-button :disabled="!canAddToCard(lesson)" @click="addProduct(lesson)">Add to cart</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>

    </div>
  </div>
</template>
<script>
export default {
  name: "LessonList",
  props: ["sortedLesson","basket"],
  data() {
    return {}
  },
  methods: {
    //function to check lesson spaces
    canAddToCard(lesson) {
      return lesson.spaces > this.count(lesson.id)
    },

    //function to count 
    count(id) {
      let count = 0;
      for (let i = 0; i < this.basket.length; i++) {
        if (this.basket[i] == id) {
          count++;
        }
      }
      return count;
    },
       
    //event to add product
    addProduct(lesson){
        this.$emit("add-Product", lesson)
    }


  },
 
}
</script>
