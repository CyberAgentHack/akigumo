<template>
  <div class="app-main">
    <header>
      <div class="app-name">Akigumo</div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app-main',
};
</script>

<style>
header {
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: #E09127;
  color: white;
  width: 100vw;
  height: 50px;
}

.app-name {
  font-size: 1.5em;
}
</style>
