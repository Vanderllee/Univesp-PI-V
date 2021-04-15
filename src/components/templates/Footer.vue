<template>
  <div class="footer">
      <span>Copyright <strong>JoséV</strong>2021</span>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background: #ddd;
        color: #333;

        display: flex;

        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }
</style>