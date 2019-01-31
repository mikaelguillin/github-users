<template>
  <section class="userSearch">
    <input type="text" placeholder="Joseph" v-model="user" />

    <template v-if="errors.length">
      <div class="appError">
        <div class="msgApp msgApp--error">Aïe, il semblerait qu'il y ait une erreur technique</div>
        <button class="btn btn--refresh" type="button" v-on:click="refresh()">Rafraîchir l'écran</button>
      </div>
    </template>

    <template v-else>
      <div class="filters" v-if="user && users && users.length > 1">
        <div class="filters__label">Trier par</div>
        <v-select v-model="filter" :options="[{label:'nombre de repositories',value:'repositories'},{label:'nombre de followers', value: 'followers'}, {label:'score', value:'score'}]">
        </v-select>
      </div>

      <div class="msgApp" v-if="!user">Entrez le nom d'un profil Github</div>

      <ul class="usersList" v-else-if="users && users.length">
        <li is="UserItem" v-for="currentUser in users" :key="currentUser.id" :user="currentUser" :userModel="user"></li>
      </ul>

      <div class="msgApp msgApp--noResults" v-else>Aucun résultat ne correspond à votre recherche</div>
    </template>
  </section>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'UsersList',

  components: {
    UserItem
  },

  data: function () {
    return {
      user: '',
      users: [],
      filter: [],
      errors: []
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
      const xhr = new XMLHttpRequest()
      const self = this

      if (this.filter.value) {
        apiURL += `&sort=${this.filter.value}`
      }

      xhr.open('GET', apiURL)
      xhr.setRequestHeader('Authorization', `token ${process.env.VUE_APP_TOKEN}`)
      xhr.onload = function () {
        const json = JSON.parse(xhr.responseText)
        self.users = json.items

        if (json.errors) {
          self.errors = json.errors
        }
      }
      xhr.send()
    },
    refresh: function () {
      location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userSearch
{
  margin: 0 auto;
  max-width: 670px;
  padding: 0 15px;

  input[type="text"]
  {
    background: #fff url('../assets/icons/lens.svg') 10px 50% no-repeat;
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
  list-style-type: none;
  padding: 0;
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

  &--noResults:before { content: url('../assets/icons/telescope.svg'); }

  &--error:before { content: url('../assets/icons/buoy.svg'); }
}

.filters
{
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.filters__label
{
  margin: 0 0 0 auto;
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

.appError
{
  text-align: center;

  .btn--refresh
  {
    margin: 20px 0 0;
  }
}
</style>
