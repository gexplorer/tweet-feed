<template>
<nav class="navbar navbar-dark bg-primary d-flex">
  <span class="navbar-brand mb-0 h1"><font-awesome-icon icon="hashtag"/>TweetFeed</span>
  <form class="form-inline">
    <div class="btn-group btn-group-sm mr-5" role="group">
      <button
        class="btn btn-dark"
        type="button"
        @click="add">
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
    <div class="btn-group btn-group-sm" role="group">
      <button
        class="btn"
        type="button"
        @click="prevTweet">
        <font-awesome-icon icon="backward"/>
      </button>
      <button
        v-if="!active"
        class="btn btn-success px-5"
        type="button"
        @click="start">
        <font-awesome-icon icon="play"/>
      </button>
      <button
        v-else
        class="btn btn-danger px-5"
        type="button"
        @click="stop">
        <font-awesome-icon icon="stop"/>
      </button>
      <button
        class="btn"
        type="button"
        @click="nextTweet">
        <font-awesome-icon icon="forward"/>
      </button>
    </div>
  </form>
</nav>
</template>

<script lang="ts" src="./TweetFeedConfigMenu.ts">
</script>

<style>
</style>
