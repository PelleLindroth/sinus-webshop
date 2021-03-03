<template>
  <section>
    <h2>{{ title }}</h2>
    <div v-if="!orderHistory" class="no-orders">
      <p><em>No orders yet...</em></p>
    </div>
    <ul v-else class="order-list">
      <li v-for="order in orderHistory" :key="order._id" class="order">
        <div class="row-wrapper">
          <div class="order-row" @click="showOrder(order)">
            <div class="details-amount">
              <div class="details">
                <p>ORDER#: {{ order._id }}</p>
                <p>DATE: {{ calculateDate(order.timeStamp) }}</p>
              </div>
              <div class="amount">
                <p>TOTAL AMOUNT: {{ order.orderValue }} SEK</p>
              </div>
            </div>
            <div
              class="status"
              :style="{
                backgroundColor: statusBackground(order.status),
                color: '#fff',
              }"
            >
              STATUS: {{ orderStatus(order.status) }}
            </div>
          </div>
          <select
            v-if="admin"
            @change="setStatus(order, $event)"
            class="set-status"
          >
            <option hidden selected>Set status</option>
            <option value="inProcess">In process</option>
            ><option value="shipped">Shipped</option>
            ><option value="delivered">Delivered</option>
            ><option value="canceled">Cancelled</option></select
          >
        </div>

        <transition name="items">
          <ul v-if="showItems(order)" class="order-details">
            <li
              v-for="(item, index) in order.items"
              :key="index"
              class="order-item"
            >
              <div class="img-container">
                <img :src="getImg(item.imgFile)" alt="" />
              </div>
              <h5>{{ item.title }}</h5>
              <p>Quantity: {{ item.amount }}</p>
              <p>Price: {{ item.price }} SEK</p>
              <p class="total">Subtotal: {{ item.price * item.amount }} SEK</p>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.admin) {
        return 'HANDLE ORDERS'
      }

      return 'ORDER HISTORY'
    },
    orderHistory() {
      if (this.$store.getters.getCurrentUser) {
        if (
          this.$store.getters.getOrderHistory &&
          this.$store.getters.getOrderHistory.length
        ) {
          return this.$store.getters.getOrderHistory
        }
      }

      return null
    },
  },
  data() {
    return {
      displayedOrder: null,
    }
  },
  props: {
    admin: Boolean,
  },
  methods: {
    calculateDate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = new Date(timeStamp).getDate()
      if (day < 10) {
        day = '0' + day
      }

      return `${year}/${month}/${day}`
    },
    setStatus(order, e) {
      order.status = e.target.value
      this.$store.dispatch('updateOrderStatus', order)
    },
    showItems(order) {
      if (this.displayedOrder) {
        return this.displayedOrder._id == order._id
      }
      return false
    },
    getImg(url) {
      return require(`@/assets/products/${url}`)
    },
    orderStatus(status) {
      switch (status) {
        case 'inProcess':
          return 'In Process'
        case 'shipped':
          return 'Shipped'
        case 'delivered':
          return 'Delivered'
        case 'canceled':
          return 'Cancelled'
      }
    },
    statusBackground(status) {
      switch (status) {
        case 'inProcess':
          return '#3A7380'
        case 'shipped':
          return '#1212aa'
        case 'delivered':
          return '#12aa12'
        case 'canceled':
          return '#aa1212'
      }
    },
    showOrder(order) {
      if (this.displayedOrder) {
        this.displayedOrder = null
      } else {
        this.displayedOrder = order
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

section {
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  margin-bottom: 10rem;

  .no-orders {
    font-size: 1.4rem;
    margin-top: 2rem;
  }

  .order-list {
    list-style: none;
    // width: 100%;
    margin: 4rem auto 10rem;

    .order {
      cursor: pointer;
      font-size: 1.2rem;

      &:nth-child(odd) {
        background-color: #f1f1f1;
      }

      &:hover {
        opacity: 0.9;
      }

      .row-wrapper {
        display: flex;

        .order-row {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;

          .details-amount {
            align-items: center;
            display: flex;
            padding: 1rem 2rem;

            .details,
            .amount {
              width: 20rem;
            }

            .details {
              font-weight: 300;
            }

            .amount {
              font-weight: 700;
            }
          }

          .status {
            align-items: center;
            background-color: $off-white;
            display: flex;
            font-weight: 700;
            justify-content: center;
            width: 15rem;
          }
        }
        .set-status {
          background-color: #e9e9e9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border: 0;
          font-family: inherit;
          outline: none;
          padding: 0.5rem;
          text-transform: uppercase;
        }
      }

      .items-enter,
      .items-leave-to {
        max-height: 0rem;
      }

      .items-enter-active,
      .items-leave-active {
        transition: all 0.5s;
      }

      .items-enter-to,
      .items-leave {
        max-height: 30rem;
      }

      .order-details {
        cursor: default;
        list-style: none;
        overflow: hidden;

        .order-item {
          align-items: center;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
          color: $secondary-clr-dk;
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          .img-container {
            display: flex;
            justify-content: center;
            min-width: 5rem;
            img {
              height: 4rem;
            }
          }

          h5 {
            color: #000;
            min-width: 40%;
          }

          .total {
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
