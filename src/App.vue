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

.btn
{
  cursor: pointer;
  padding: 10px 15px;
  transition: background .3s;
}

.usersList
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

    .form-control
    {
      padding-left: 0;
      padding-right: 0;
    }

    .vs__actions
    {
      align-self: flex-end;
      padding-bottom: 7px;
    }

    .open-indicator
    {
      &:before
      {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 8px 0 8px;
        border-color: #2c3e50 transparent transparent;
        transform: rotate(0deg);
      }
    }
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
  }

  &.open
  {
    .dropdown-toggle
    {
      .selected-tag { display: none; }

      .open-indicator
      {
        &:before
        {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
