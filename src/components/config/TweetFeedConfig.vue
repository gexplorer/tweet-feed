<template>
<main id="tweet-feed" class="bg-light">
  <tweet-feed-config-menu
    :active="active"
    @start="start"
    @stop="stop"
    @prevTweet="prevTweet"
    @nextTweet="nextTweet"/>
  <br>
  <div class="container-fluid">
    <transition name="slide">
      <div class="alert alert-danger" v-if="!online" role="alert">
        Couldn't connect to the server!
      </div>
    </transition>
      <div class="row">
          <div class="col" style="min-height: 200px">
              <h3>Current</h3>
              <transition name="morph" xmode="out-in">
                  <tweet-feed-config-item
                    v-if="selectedTweet"
                    :tweet="selectedTweet"
                    :key="selectedTweet._id"
                    :block="true"
                    @block="block(selectedTweet)"
                    class="mb-3 d-inline-block"></tweet-feed-config-item>
                </transition>
            </div>
      </div>
      <div class="row">
          <div class="col-md-7">
              <h4>Next</h4>
              <transition-group name="slide">
                  <tweet-feed-config-item
                    v-for="tweet in nextTweets"
                    :key="tweet._id"
                    :tweet="tweet"
                    :block="true"
                    @block="block(tweet)"
                    :pin="true"
                    @pin="pinTweet(tweet)"
                    class="mb-3"></tweet-feed-config-item>
                </transition-group>
            </div>
          <div class="col-md-5">
              <h4>Previous</h4>
              <transition-group name="slide">
                  <tweet-feed-config-item
                    v-for="tweet in prevTweets"
                    :key="tweet._id"
                    :tweet="tweet"
                    :block="true"
                    @block="block(tweet)"
                    :pin="true"
                    @pin="pinTweet(tweet)"
                    class="mb-3"></tweet-feed-config-item>
                </transition-group>
            </div>
        </div>
      <div class="row">
          <div class="col-md-3">
              <h4>Blocked</h4>
              <transition-group name="slide">
                  <tweet-feed-config-item
                    v-for="tweet in blockedTweets"
                    :key="tweet._id"
                    :tweet="tweet"
                    :block="true"
                    @block="block(tweet)"
                    class="mb-3"></tweet-feed-config-item>
                </transition-group>
            </div>
      </div>
  </div>
    
  </div>
  <div class="modal fade"
       :class="modalClass"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Slideshow config</h5>
          <button type="button"
                  class="close"
                  @click="starting = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for=" max" class="col-form-label">Max:</label>
              <input type="number"
                     min="1"
                     v-model="max"
                     class="form-control"
                     id="max">
            </div>
            <div class="form-group">
              <label for="delay" class="col-form-label">Delay:</label>
              <input type="number"
                     min="1000"
                     step="1000"
                     v-model="delay"
                     class="form-control"
                     id="delay">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  @click="starting = false">Cancel</button>
          <button type="button"
                  class="btn btn-success"
                  @click="doStart()">Start</button>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script lang="typescript" src="./TweetFeedConfig.ts">
</script>

<style lang="scss" src="./TweetFeedConfig.scss">
</style>
