<template>
<div class="tweet border rounded d-flex bg-white shadow-sm">
  <div class="tweet-body xbg-white flex-fill">
    <div class="p-4">
      <button class="btn btn-link float-right">
        <font-awesome-icon :icon="starredIcon"
                           v-if="!tweet.blocked"
                           @click="starTweet"/>
      </button>
      <img :src="tweet.avatar" alt="avatar" class="rounded-circle float-left mr-3">
      <h5 class="card-title">@{{tweet.username}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{tweet.date | formatDate }}</h6>
    </div>
    <div class="px-4 pb-3">{{ tweet.text }}</div>
    <div class="tweet-image flex-fill"
         v-if="hasImage"
         :style="imageStyle">
    </div>
    <div class="px-4 py-3"
         v-if="pin || block">
      <a v-if="pin"
         href="#"
         class="card-link text-success"
         @click="pinTweet"><font-awesome-icon icon="thumbtack"/> Pin</a>
      
      <a v-if="block"
         href="#"
         class="card-link text-danger"
         @click="blockTweet"><font-awesome-icon icon="trash"/> {{ tweet.blocked? 'Unblock' : 'Block' }}</a>
    </div>
  </div>
</div>
</template>

<script lang="ts" src="./TweetFeedConfigItem.ts">
</script>

<style lang="scss" src="./TweetFeedConfigItem.scss">
</style>
