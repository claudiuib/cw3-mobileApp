<template>
  <div id="app">
    <header>

      <title>Lessons</title>
      <div class="navbar navbar-dark bg-primary">
        <div class="navbar­header">
          <h1>Lessons</h1>
        </div>
        <div class="nav navbar­nav navbar ­right cart">

          <!-- button shopping cart -->

          <!-- <button :disabled="this.cart.length > 0 ? false : true" class="btn  btn-info mx-4" v-on:click="showCheckout"> -->
          <button class="btn  btn-info " v-on:click="showCheckout">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart"
              viewBox="0 0 16 16">
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg> Shopping Cart {{ totalItemsInBasket }}
          </button>


        </div>
      </div>
      <div class="btn-group btn-group-sm mt-2" aria-label="Basic example">
        <button type="button" class="btn  btn-primary mr-2" @click="deleteAllCaches">Delete All Caches</button>
        <button type="button" class="btn  btn-primary mr-2" @click="reloadPage">Reload Page</button>
        <button type="button" class="btn  btn-primary mr-2" @click="unregisterAllServiceWorkers">Unregister Service
          Worker</button>
        <a href="#" :href="url" class="link-info">Lessons link</a>
      
      </div>

    </header>

    <main>
      <!-- components -->
      <component :is="currentView" :sortedLesson="sortedLesson" :basket="basket" @add-Product="addProduct"
        tempBasket="tempBasket" @remove-Product="removeProduct">
        <!-- @submit-Form="submitForm" -->
      </component>
    </main>
  </div>
</template>
 
<script>

import ProductList from './components/Products.vue'
import Checkout from './components/Checkout.vue'


export default {
  name: "app",
  data() {
    return {
      sitename: "Lesson Shop",
      currentView: ProductList,

      lessons: [],
      tempBasket: [],
      basket: [],
      url: "https://cw3-env.eba-zsifjhza.eu-west-2.elasticbeanstalk.com/collections/products"

    }

  },
  components: { ProductList, Checkout },
  methods: {
    //method to show Checkout or ProductList 
    showCheckout() {
      if (this.currentView === ProductList) {
        this.currentView = Checkout
      } else {
        this.currentView = ProductList
      }
    },
    //fetch data from  aws backend
    displayData() {

      fetch("https://cw3-env.eba-zsifjhza.eu-west-2.elasticbeanstalk.com/collections/products")
        .then(response => response.json())
        .then(lessons => {
          this.lessons = lessons;

        });
    },

    //function to add product
    addProduct(lesson) {
      if (lesson.spaces >= 1) {
        lesson.spaces = lesson.spaces - 1;
        this.basket.push(lesson);
        if (!(this.tempBasket.includes(lesson))) {
          this.tempBasket.push(lesson);
        }
      }
    },
    //function to remove product   
    removeProduct(product) {
      if (this.basket.includes(product)) {
        let index = this.basket.indexOf(product);
        this.basket.splice(index, 1);
        for (let i = 0; i < this.lessons.length; i++) {
          if (product == this.lessons[i]) {
            this.lessons[i].spaces++;
          }
        }
      }
    },

    productLeft(lesson) {
      for (let i = 0; i < this.lessons.length; i++) {
        if (lesson == this.lessons[i]) {
          return this.lessons[i].spaces;
        }
      }
    },
    //function to delete caches
    deleteAllCaches() {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
    },
    //method to unregister service worker
    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister()
        }
      });
      console.log("ServiceWorkers Unregistered");
    },
    reloadPage() {
      window.location.reload();
    },
    //function to search
      


  },

  computed: {
    totalItemsInBasket: function () {
      return this.basket.length || "";
    },



    sortedLesson() {
      function compare(a, b) {
        if (a.price > b.price) return +1;
        if (a.price < b.price) return -1;
        return 0;
      }
      return this.lessons.sort(compare);
    },




  },
  created() {

    this.displayData();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
  },
}
</script>