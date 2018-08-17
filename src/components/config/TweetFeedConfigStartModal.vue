<template>
<div class="modal show"
     tabindex="-1"
     role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><font-awesome-icon icon="desktop"/> Slideshow config</h5>
        <button type="button"
                class="close"
                @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="max" class="col-form-label">Max:</label>
            <input type="number"
                   min="5"
                   v-model="maxValue"
                   class="form-control"
                   id="max">
          </div>
          <div class="form-group">
            <label for="delay" class="col-form-label">Delay:</label>
            <input type="number"
                   min="1"
                   step="1"
                   v-model="delayValue"
                   class="form-control"
                   id="delay">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button"
                class="btn btn-secondary"
                @click="close">Cancel</button>
        <button type="button"
                class="btn btn-primary"
                @click="ok"
                :disabled="disabled">Start</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="typescript" src="./TweetFeedConfigStartModal.ts">
</script>

<style>
</style>
