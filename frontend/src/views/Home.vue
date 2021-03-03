<template>
  <section>
    <header>
      
        <img src="@/assets/products/skate-hero-1.jpg" alt="Man performing skate jump at sunset">
      
    </header>
    <main>
      <p>Results: {{fetchProducts.length}}</p>
      <div class="filter-wrapper">
        <label for="filters">Filter by:</label>

        <select v-model="searchBy" id="filters">
          <option value="wheels">wheels</option>
          <option value="clothes">clothes</option>
          <option value="board">board</option>
        </select>

        <button @click="clearFilters">Clear all filters!</button>
      </div>
    <section class="products">
      <ProductCard v-for="product in fetchProducts" :key="product._id" :prod="product" />
    </section>
    <h3 v-if="!productsToShow">It seems that we could't find what you are looking for. Please try again!</h3>
    </main>
    <img @click="scrollUp" ref="topBtn" id="topBtn" src="@/assets/icons/arrow-up-white.svg" alt="">
  </section>
  
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"


export default {
  
  name: 'Home',
  components: {
   ProductCard
  },
  data(){
    return{
      searchBy : null
    }
  },
  computed: {
    fetchProducts() {
      if (!this.searchBy) {
        return this.$store.getters.getProducts
      }else{
        return this.filterTheProduct(this.$store.getters.getProducts)
      } 
    },
    productsToShow(){
      if (this.fetchProducts.length == 0) {
        return false
      }else{
        return true
      }
    }
  },
    created(){
      window.addEventListener('scroll', this.handleScroll);
  },
   destroyed(){
      window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
     handleScroll(){
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        this.$refs.topBtn.style.display = 'block';
      } else {
        this.$refs.topBtn.style.display = "none";
      }
    },
    scrollUp(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    filterTheProduct(array){
        let filteredProducts = []
        array.map(prod => {
          for (let key in prod) {
            if ( prod[key] == this.searchBy) {
              filteredProducts.push(prod)
            }
          }
        })
        return filteredProducts
    },
    clearFilters(){
      this.searchBy = null
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/styles/_variables.scss";

header {
  img {
    width: 100%;
  }
}

main {
max-width: 100rem;
margin: 5rem auto;

p {
  font-size: 1.6rem;
  font-weight: 700;
}
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  
}
#topBtn {
  height: 5rem;
  width: 5rem;
  display: none;
  position: fixed;
  bottom: 60px;
  right: 30px;
  outline: none;
  cursor: pointer;
  background-color: rgb(0, 0, 0);
  padding: 1rem;
  border-radius: 50%;
}

</style>