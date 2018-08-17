<template>
<div class="modal show"
     tabindex="-1"
     role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><font-awesome-icon icon="comment-alt"/> New tweet</h5>
        <button type="button"
                class="close"
                @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="text" class="col-form-label">Text:</label>
            <textarea v-model="text"
                      class="form-control"
                      id="text"
                      maxlength="150"
                      rows="5">
            </textarea>
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
                :disabled="disabled">Ok</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="typescript" src="./TweetFeedConfigInputModal.ts">
</script>

<style>
</style>
