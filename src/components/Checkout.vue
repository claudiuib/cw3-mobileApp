<template>
    <!-- card lessons  -->
    <div>
        <h1 class="text-center">Total items in the cart:</h1>
        <h2 class="text-center">{{ totalItemsInBasket }}items in total</h2>
        <b-container class="bv-example-row mt-3">
            <b-row>
                <b-col v-for="product in basket">
                    <b-card :title="product.title" v-bind:img-src="product.image" img-top style="max-width: 150px"
                        tag="article" class="mb-2">
                        <b-card-text>
                            Places: {{ product.spaces }}<br>
                            Location: {{ product.location }}<br>
                            Price: £{{ product.price }}
                        </b-card-text>
                        <b-button v-on:click="remove(product)">Remove</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <!-- checkout form -->
        <div>
            <div class="d-flex justify-content-center mt-5 mb-5">
                <h5> Checkout </h5>
            </div>
            <b-container>
                <b-row>
                    <b-col>
                        <b-form-input id="fullName" placeholder="Name" v-model="fullName"></b-form-input>
                        <p v-if="!nameIsValid" class="error message">Only letters allowed</p>
                    </b-col>
                    <b-col>
                        <b-form-input id="phone" placeholder="Phone" v-model="phone"></b-form-input>
                        <p v-if="!phoneIsValid" class="error message">Only numbers allowed</p>
                    </b-col>
                    <b-col>
                        <b-button :disabled="!formIsValid" v-on:click="submitForm">Checkout</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>


export default {
    name: "Lessons",
    props: ["basket", "tempBasket"],
    data() {
        return {

            fullName: "",
            phone: ""

        };
    },
    methods: {
     
    //    submitForm() {
    //         this.$emit("submit-Form")
    //     },
        //function remove product
        remove(product) {
            this.$emit("remove-Product", product);
        },
        
        submitForm() {
      if (this.nameIsValid && this.phoneIsValid && this.formIsValid) {
        //send details to the database 

        fetch(' https://cw3-env.eba-zsifjhza.eu-west-2.elasticbeanstalk.com/collections/order', {
          method: 'post',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name: this.fullName,
            phone: this.phone,
            basket: this.basket
          })
        })
          .then(response => response.json())

          .then(data => console.log(data))
          .catch(err => console.log(err))
        alert("Order submited")
        for (let i = 0; i < this.tempBasket.length; i++) {

          let tempB = this.tempBasket[i];
          console.log(app.productLeft(tempB));
          console.log(tempB.id)
          fetch(" https://cw3-env.eba-zsifjhza.eu-west-2.elasticbeanstalk.com/collections/products/" + tempB.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(
              { "spaces": app.productLeft(tempB) })
          })
            .then(function (response) {
              response.json().then(function (json) { console.log(json) });
            });

        }
      }
      else {
        alert("Error Validation Failed")
      }
    },
    productLeft(lesson) {
      for (let i = 0; i < this.lessons.length; i++) {
        if (lesson == this.lessons[i]) {
          return this.lessons[i].spaces;
        }
      }
    },

    },
    computed: {
        totalItemsInBasket: function () {
            return this.basket.length || "";
        },
        nameIsValid() {
            return /[a-zA-Z]/.test(this.fullName);
        },
        phoneIsValid() {
            return /[0-9]/.test(this.phone)
        },
        formIsValid() {
            return this.nameIsValid && this.phoneIsValid
        },

    },
}
    
       
        
    


</script>