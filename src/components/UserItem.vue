<template>
  <li>
    <article class="userItem">
      <a :href="user.html_url">
        <img class="userItem__avatar" :src="user.avatar_url" :alt="'avatar de ' + user.login" />
      </a>

      <div class="userItem__details">
        <a :href="user.html_url" class="userItem__login" v-highlight="{keyword: userModel, sensitive: false, overWriteStyle: {color: 'inherit'}}">
         {{ user.login }}
        </a>

        <div class="userItem__stats">
          <span class="userItem__score">{{ Math.round(user.score) }}</span>
          <span class="userItem__repos" v-if="details.public_repos"> - {{ details.public_repos }} repositories</span>
        </div>

        <div class="userItem__followers" v-if="details.followers">
          Suivi par :
          <img class="userItem__firstFollowerAvatar" :src="firstFollower.avatar_url" :alt="'avatar de ' + firstFollower.login" />
          <span class="userItem__firstFollower">
          {{ firstFollower.login }} {{ details.followers > 1 ? `+ ${details.followers - 1}` : '' }}
          </span>
        </div>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['user', 'userModel'],
  data: function () {
    return {
      firstFollower: {},
      details: {}
    }
  },

  created: function () {
    this.fetchUserDetails()
    this.fetchFirstFollower()
  },

  methods: {
    fetchUserDetails: function () {
      const apiURL = this.user.url
      const xhr = new XMLHttpRequest()
      const self = this

      xhr.open('GET', apiURL)
      xhr.setRequestHeader('Authorization', `token ${process.env.VUE_APP_TOKEN}`)
      xhr.onload = function () {
        self.details = JSON.parse(xhr.responseText)
      }
      xhr.send()
    },
    fetchFirstFollower: function () {
      const apiURL = this.user.followers_url
      const xhr = new XMLHttpRequest()
      const self = this

      xhr.open('GET', apiURL)
      xhr.setRequestHeader('Authorization', `token ${process.env.VUE_APP_TOKEN}`)
      xhr.onload = function () {
        const json = JSON.parse(xhr.responseText)
        self.firstFollower = json[0] || {}
      }
      xhr.send()
    }
  }
}
</script>

<style scoped lang="scss">
.userItem
{
 background: #fff;
 border-radius: 8px;
 box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
 margin: 20px 0;
 display: flex;
 align-items: center;
 padding: 25px 20px;

 &__login
 {
  font-size: 1.25em;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

&__stats,
&__followers { font-size: .9em; }

&__score
{
 &:before
 {
  display: inline-block;
  content: url('../assets/icons/star.svg');
  vertical-align: middle;
}
}

&__followers { display: flex; }

&__avatar,
&__firstFollowerAvatar
{
 border-radius: 50%;
 overflow: hidden;
 color: transparent;
}

&__avatar
{
 display: block;
 height: 70px;
 width: 70px;
 margin: 0 10px 0 0;
 white-space: nowrap;
}

&__firstFollowerAvatar
{
 height: 20px;
 width: 20px;
 margin: 0 5px;
}

&__firstFollower { font-weight: 600; }
}
</style>
