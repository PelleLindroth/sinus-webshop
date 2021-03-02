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
  <h2>ADMIN</h2>
  
  <div class="flex-wrapper">
  <form @submit.prevent="addNewProduct" class="information-wrapper">
      <p class="bold">Add new item</p>

      <div class="view-row">
        <label>Title</label>
        <input type="text"  v-model="product.title" />
      </div>

      <div class="view-row">
        <label>Price:</label>
        <input type="text" v-model="product.price" />
      </div>

      <div class="view-row">
        <label>Short Desc:</label>
        <input type="text" v-model="product.shortDesc" />
      </div>

      <div class="view-row">
        <label>Long desc:</label>
        <input type="text" v-model="product.longDesc" />
      </div>

      <div class="view-row">
        <label>Image file:</label>
        <input type="text" v-model="product.imgFile"  />
      </div>

      <BaseButton color="teal" class="btn">Add Product</BaseButton>
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
      }
  }
},
computed: {
  products() {
    return this.$store.getters.getProducts
  },
  userRole() {
    console.log(this.$store.getters.getCurrentUser);
    return this.$store.getters.getCurrentUser
  }
},
methods: {
  async addNewProduct() {
    const success = await this.$store.dispatch("createProduct", this.product)
    if (success) {
      this.product = {
        title: "",
        price: "",
        shortDesc: "",
        longDesc: "",
        imgFile: ""
      }
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
      input {
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