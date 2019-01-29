<template>
  <div id="app">
    <UsersList/>
  </div>
</template>

<script>
  import UsersList from './components/UsersList.vue'

  export default {
    name: 'app',
    components: {
      UsersList
    }
  }
</script>

<style lang="scss">
*,
*:before,
*:after { box-sizing: border-box; }

body
{
  margin: 0;
  padding: 0;
}

#app {
  background: #f7f7f7;
  font-family: 'Open Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 40px 0;
  min-height: 100vh;
  line-height: 1.2;
}

.UsersList
{
  .highlighted
  {
    background: rgba(255,238,124,.6);
    border-radius: 4px;
  }
}

.v-select.dropdown
{
  .dropdown-toggle
  {
    border: 0;

    .clear { display: none; }
    .form-control { display: none; }
  }

  .dropdown-menu
  {
    border: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    border-radius: 8px;
    width: auto;
    left: auto;
    right: 0;

    > .highlight > a
    {
      background: rgba(72, 72, 72, .1);
      color: inherit; 
    }

    .selected-tag { display: none; }
  }
}
</style>
