<template>
  <footer class="footer">
    © {{ currentYear }} Nifehub Portal
    <!-- Add any other footer content here -->
  </footer>
</template>

<script>
import Logo from '@/assets/logo/Background.png'
import AuthImg from '@/assets/images/auth-img.png'

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
/* Add styling for the footer */
footer {
  padding: 10px;
  text-align: center;
  position: fixed; /* hoặc absolute */
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
}
</style>
