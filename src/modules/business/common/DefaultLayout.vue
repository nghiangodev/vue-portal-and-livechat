<template>
  <div>
    <Header/>
    <main>
        <slot></slot>
    </main>
    <Footer/>
  </div>
</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
<style>
/* Add any global styling for the layout here */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: #F1F4F7;
}

main {
  padding: 20px;
  margin: 20px;
  background-color: var(--bs-body-bg);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
