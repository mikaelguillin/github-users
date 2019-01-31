<template>
  <div class="userSearch">
    <input type="text" placeholder="Joseph" v-model="user" />

    <div class="filters" v-show="users.items && users.items.length > 1">
      <div class="filters__label">Trier par :</div>
      <v-select v-model="selected" :options="[{label:'nombre de repositories',value:'repositories'},{label:'nombre de followers', value: 'followers'}, {label:'score', value:'score'}]">
      </v-select>
    </div>

    <div class="msgApp" v-if="!user">Entrez le nom d'un profil Github</div>

    <ul class="usersList" v-else-if="users.items && users.items.length">
      <li is="UserItem" v-for="currentUser in users.items" :key="currentUser.id" :user="currentUser" :userModel="user"></li>
    </ul>

    <div class="msgApp msgApp--noResults" v-else>Aucun résultat ne correspond à votre recherche</div>

    <!-- <div>Aïe, il semblerait qu'il y ait une erreur technique</div> -->
  </div>
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
      users: {},
      selected: []
    }
  },

  created: function () {
    this.debouncedGetUser = this._.debounce(this.fetchUsers, 500)
  },

  watch: {
    user: function (newUser, oldUser) {
      // this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetUser()
    },
    selected: function(newFilter, oldFilter) {
      if(this.user)
        this.debouncedGetUser()
    }
  },

  methods: {
    fetchUsers: function () {
      const apiURL = `https://api.github.com/search/users?q=${this.user} in:login type:user&per_page=4`
      const xhr = new XMLHttpRequest()
      const self = this

      if(this.selected.value) {
        apiURL += `&sort=${this.selected.value}`
      }

      xhr.open('GET', apiURL)
      xhr.setRequestHeader('Authorization', `token ${process.env.VUE_APP_TOKEN}`)
      xhr.onload = function () {
        self.users = JSON.parse(xhr.responseText)
      }
      xhr.send()
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
    padding: 15px 10px 15px 50px;
    width: 100%;
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

  &--noResults:before
  {
    display: block;
    content: url('../assets/icons/telescope.svg');
    margin: 0 0 10px;
  }
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
</style>
