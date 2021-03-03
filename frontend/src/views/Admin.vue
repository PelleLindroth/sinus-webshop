<template>
<section 
v-if="!userRole || userRole.role === 'customer'"
class="no-access"
>
<h2>ACCESS DENIED</h2>
<p>You do not have access to this page.</p>
<p>Please contact your site administrator if this is a mistake.</p>
</section>

<section v-else class="admin-wrapper">
  <Breadcrumbs path1="admin" />
  <h2>ADMIN</h2>
  
  <div class="flex-wrapper">
  <form @submit.prevent="addNewProduct" class="information-wrapper">
      <p class="bold">Add new item</p>

      <div class="view-row">
        <label>Title</label>
        <input type="text"  v-model="product.title" required/>
      </div>

      <div class="view-row">
        <label>Price:</label>
        <input type="text" v-model="product.price" required/>
      </div>

      <div class="view-row">
        <label>Short Desc:</label>
        <input type="text" v-model="product.shortDesc" required />
      </div>

      <div class="view-row">
        <label>Long desc:</label>
        <input type="text" v-model="product.longDesc" required/>
      </div>

      <div class="view-row">
        <label for="imageFile">Image file:</label>
        <select name="imageFile" id="imageFile" v-model="product.imgFile" required >
          <option value="skateboard-aurora.png"  >skateboard-aurora.png</option>
          <option value="skateboard-cartoon.png"  >skateboard-cartoon.png</option>
          <option value="skateboard-cat.png"  >skateboard-cat.png</option>
          <option value="skateboard-dog.png"  >skateboard-dog.png</option>
          <option value="skateboard-eagle.png"  >skateboard-eagle.png</option>
          <option value="skateboard-fire.png"  >skateboard-fire.png</option>
          <option value="skateboard-fireworks.png"  >skateboard-fireworks.png</option>
          <option value="skateboard-flower.png"  >skateboard-flower.png</option>
          <option value="skateboard-generic.png"  >skateboard-generic.png</option>
          <option value="skateboard-girl.png"  >skateboard-girl.png</option>
          <option value="skateboard-greta.png"  >skateboard-greta.png</option>
          <option value="skateboard-ink.png"  >skateboard-ink.png</option>
          <option value="skateboard-newyork.png"  >skateboard-newyork.png</option>
          <option value="skateboard-polarbear.png"  >skateboard-polarbear.png</option>
          <option value="skateboard-purple.png"  >skateboard-purple.png</option>
          <option value="skateboard-smoke.png"  >skateboard-smoke.png</option>
          
      </select>
      </div>

      <BaseButton color="teal" class="btn">Add Product</BaseButton>

      <transition name="fade">

      <p class="message" v-if="showMessage">Success! Your product was added to the store.</p>
      <p class="error message" v-if="showError">Oops! Something went wrong, please try again.</p>
      </transition>
  </form>

  <section class="products">
    <h2>ALL PRODUCTS</h2>
    <SmallProductCard 
    v-for="product in products" 
    :key="product._id" 
    :prod="product"
    class="card" />
  </section>
  </div>


</section>
</template>

<script>
import SmallProductCard from "@/components/SmallProductCard.vue"
export default {
components: {
  SmallProductCard
},
data() {
  return {
    product: {
        title: "",
        price: "",
        shortDesc: "",
        longDesc: "",
        imgFile: ""
      },
    showMessage: false,
    showError: false,
  }
},
computed: {
  products() {
    return this.$store.getters.getProducts
  },
  userRole() {
    
    return this.$store.getters.getCurrentUser
  }
},
methods: {
  async addNewProduct() {
    const success = await this.$store.dispatch("createProduct", this.product)
    console.log(success);
    if (success) {
      this.product = {
        title: "",
        price: "",
        shortDesc: "",
        longDesc: "",
        imgFile: ""
      }
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  }
}
}
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.no-access {
  height: 70rem;
  padding: 5rem;
  text-align: center;

  h2 {
    margin-bottom: 5rem;
  }

  p {
    font-size: 2rem;
    line-height: 1.6;
  }
}

.admin-wrapper {
  max-width: 100rem;
  margin: auto;

  h2 {
  text-align: center;
  margin: 5rem 0;
}

  .information-wrapper {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: auto;
    

    .bold {
      font-size: 2rem;
      font-weight: 700;
      
    }

    .btn {
      width: 30%;
      margin: 3rem 0 3rem auto;
      
    }

    .message {
      align-self: flex-end;
      font-size: 1.4rem;
    }

    .error {
      color: red;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-to, .fade-leave {
      opacity: 1;
    }

    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s ease;
    }

    .view-row {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      width: 100%;

      label {
        font-size: 1.2rem;
        min-width: 10rem;
      }

      .info,
      input, select {
        background-color: $off-white;
        border: 1px solid $secondary-clr-dk;
        font-family: inherit;
        font-size: 1.4rem;
        height: 3rem;
        outline: none;
        padding: 0.5rem;
        width: 75%;
      }
    }
  }

  .products {
    max-width: 50%;
    margin: 3rem auto;

    .card {
      margin-top: 2rem;
    }
    
  }
}
</style>