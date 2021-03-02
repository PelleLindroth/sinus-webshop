<template>
<article>
  <div class="image-container">
    <img :src="imageFile" :alt="prod.shortDesc">
  </div>
  <div class="prod-details">
    <p class="large">{{prod.title}}</p>
    <p>{{prod.shortDesc}}</p>
    
    <p class="small article-num">Article No: {{prod._id}}</p>
  </div>
  <div class="prod-edit">
    <section class="amount" v-if="$route.path=== '/cart'">
    <div class="dark-bg" @click="removeItemFromCart(prod._id)"><p class="large">-</p></div>
    <div><p class="large">{{prod.amount}}</p></div>
    <div class="dark-bg" @click="addItemToCart(prod._id)"><p class="large">+</p></div>
    </section>
    <section v-if="$route.path === '/admin'">
    <img src="@/assets/icons/edit.svg" alt="delete icon" @click="openEditModal" />
    </section>
    <img src="@/assets/icons/delete.svg" alt="delete icon"
    @click="deleteItemFromCart(prod._id)">
    <p class="large">{{prod.price}} kr</p>
  </div>
  <BaseModal v-if="toggleModal" >
  <section class="modal-inner">
      <section class="delete-info" v-if="deleteOrEdit === 'delete'">
        <p class="bold">Are you sure you want to delete item from the store?</p>
        <p>This action <strong>cannot</strong> be undone</p>
        <BaseButton color="pink" class="btn" @click.native="deleteProduct" >CONFIRM</BaseButton>
        <BaseButton color="offwhite" class="btn" @click.native="closeModal">CANCEL</BaseButton>
      </section>
      <section class="edit-info" v-if="deleteOrEdit === 'edit'">
        <form @submit.prevent="updateProduct" class="information-wrapper">
      <p class="bold">Edit item</p>

      <div class="view-row">
        <label>Title</label>
        <input type="text" v-model="product.title" />
      </div>

      <div class="view-row">
        <label>Price:</label>
        <input type="text" v-model="product.price"/>
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
        <input type="text" v-model="product.imgFile" />
      </div>
      <div class="edit-buttons">
       <BaseButton color="offwhite" class="btn" type="button" @click.native="closeModal">CANCEL</BaseButton>
      <BaseButton color="teal" class="btn" >Edit Product</BaseButton>
    </div>
  </form>
      </section>
  </section>
  </BaseModal>

  
</article>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue"
export default {
props: {
  prod: Object  },
  components: {
    BaseModal
  },
  data() {
    return {
      toggleModal: false,
      deleteOrEdit: "",
      product: {
        _id: this.prod._id,
        title: this.prod.title,
        price: this.prod.price,
        shortDesc: this.prod.shortDesc,
        longDesc: this.prod.longDesc,
        imgFile: this.prod.imgFile
      }
    }
  },
  computed: {
    imageFile() {
    return require(`@/assets/products/${this.prod.imgFile}`)
  }
  },
  methods: {
    addItemToCart(id) {
      this.$store.dispatch("addToCart", id)
    },
    removeItemFromCart(id) {
      this.$store.dispatch("removeFromCart", id)
    },
    deleteItemFromCart(id) {
      if(this.$route.path === "/cart") {
        this.$store.dispatch("deleteFromCart", id)
      }
      if (this.$route.path === "/admin") {
        this.toggleModal = true;
        this.deleteOrEdit = "delete"
      }
      
    },
    openEditModal() {
      this.toggleModal = true;
      this.deleteOrEdit = "edit"
    },
    closeModal() {
      this.toggleModal = false
    },
    updateProduct() {
      this.$store.dispatch("updateProduct", this.product)
      this.toggleModal = false
    },
    deleteProduct() {
      this.$store.dispatch("deleteProduct", this.product._id)
      this.toggleModal = false
   }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

article {
  display: flex;
  border-bottom: 1px solid $secondary-clr-lt;
  width: 50rem;
  

  p {
    font-size: 1.4rem;
  }

  .large {
    font-size: 2rem;
    font-weight: 700;
  }

  .small {
    font-size: 1.2rem;
  }

  .image-container {
    width: 10rem;
    background: linear-gradient(#fff, $off-white);
    margin-right: 1rem;

    img {
      width: 100%;
    }
  }

  .prod-details {
    width: 30rem;

    
  }

  .prod-edit {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    .amount {
      display: flex;
      border: 1px solid $secondary-clr-dk;

      div {
        width: 3rem;
        height: 3rem;
        text-align: center;

        
      }

      .dark-bg {
        background-color: $secondary-clr-dk;
        color: #fff;
        cursor: pointer;
      }
    }

    img {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }
}

.modal-inner {
  background-color: #fff;
  width: 45rem;
  
  border-radius: 8px;
  padding: 4rem 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .bold {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;

  }

  .btn {
    margin-top: 3rem;
  }

  .btn + .btn {
    margin-left: 2rem;
  }

  .information-wrapper {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
    
    .edit-buttons {
      align-self: flex-end;
    }

    .bold {
      font-size: 2rem;
      font-weight: 700;
      
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

}

</style>