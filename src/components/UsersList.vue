<template>
  <ul class="usersList">
    <li is="UserItem" v-for="currentUser in users" :key="currentUser.id" :user="currentUser" :userModel="userModel"></li>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'UsersList',
  props: ['users', 'userModel'],
  components: {
    UserItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.usersList
{
  list-style-type: none;
  padding: 0;
}
</style>
