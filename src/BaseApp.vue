<script setup lang="ts">
import { QLayout, QPage, QPageContainer } from 'quasar'
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <QPage class="q-pa-md">

        <div class="app-container">
          <slot />
        </div>

      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 1600px) {
  .app-container {
    max-width: 1400px;
  }
}
</style>