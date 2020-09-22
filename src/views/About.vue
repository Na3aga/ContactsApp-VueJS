<template>
  <div class="about">
    <h1>This is an about page</h1>
    <EditContact/>
  </div>
</template>

<script>
// Components
import EditContact from '../components/EditContact' // Form for editing/creating contacts 
export default {
  name: "About",
  components: {
    EditContact,
  },
}
</script>

<style scoped>
  #about{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
</style>