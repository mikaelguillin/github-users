<template>
  <div id="app">
    <section class="userSearch">
      <input type="text" placeholder="Joseph" v-model="user" />

      <ErrorView v-if="error" />

      <template v-else>
        <Dropdown v-if="user && users.length > 1" v-model="filter" :options="dropdownOptions" />

        <div class="msgApp" v-if="!user">Entrez le nom d'un profil Github</div>

        <UsersList v-else-if="users && users.length" :users="users" :userModel="user" />

        <div class="msgApp msgApp--noResults" v-else>Aucun résultat ne correspond à votre recherche</div>
      </template>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Dropdown from './components/Dropdown.vue'
import UsersList from './components/UsersList.vue'
import ErrorView from './components/ErrorView.vue'

export default {
  name: 'app',
  components: {
    Dropdown,
    UsersList,
    ErrorView
  },
  data: function () {
    return {
      users: [],
      user: '',
      filter: [],
      error: false,
      dropdownOptions: [
        {
          label: 'nombre de repositories',
          value: 'repositories'
        },
        {
          label: 'nombre de followers',
          value: 'followers'
        },
        {
          label: 'score',
          value: 'score'
        }
      ]
    }
  },
  created: function () {
    this.debouncedGetUser = this._.debounce(this.fetchUsers, 500)
  },
  watch: {
    user: function (newUser, oldUser) {
      this.debouncedGetUser()
    },
    filter: function (newFilter, oldFilter) {
      if (this.user) { this.debouncedGetUser() }
    }
  },
  methods: {
    fetchUsers: function () {
      let apiURL = `https://api.github.com/search/users?q=${this.user} in:login type:user&per_page=4`
      const self = this

      if (this.filter.value) {
        apiURL += `&sort=${this.filter.value}`
      }

      axios({
        url: apiURL,
        headers: {'Authorization': `token ${process.env.VUE_APP_TOKEN}`}
      }).then(function (response) {
        self.users = response.data.items
      }).catch(function (error) {
        self.error = true
      })
    }
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

.userSearch
{
  margin: 0 auto;
  max-width: 670px;
  padding: 0 15px;

  input[type="text"]
  {
    background: #fff url('assets/icons/lens.svg') 10px 50% no-repeat;
    border-radius: 6px;
    border: 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    padding: 20px 10px 20px 50px;
    width: 100%;
    transition: box-shadow .3s;
    font-size: 1.4rem;

    &:focus
    {
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
      outline: 0;
    }
  }
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

.msgApp
{
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 40px 0 0;

  &:before
  {
    display: block;
    margin: 0 0 10px;
  }

  &--noResults:before { content: url('assets/icons/telescope.svg'); }

  &--error:before { content: url('assets/icons/buoy.svg'); }
}

.btn--refresh
{
  background: #ff2674;
  border-radius: 6px;
  border: 0;
  color: #fff;

  &:hover,
  &:focus
  {
    background: darken(#ff2674, 15%);
  }
}
</style>
