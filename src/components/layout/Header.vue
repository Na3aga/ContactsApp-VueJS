<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header
{

  background:#005B96;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  grid-column: 1 / -1;

    height: max(min(10%,100px + 5vh), 100px );
    
    color: white;
    font-family: Roboto;
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
}
</style>
