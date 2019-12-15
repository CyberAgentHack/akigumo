<template>
  <div class="app-main">
    <header>
      <div class="app-name">Akigumo</div>
      <div class="setting">
        <router-link class="link" to="/setting">設定</router-link>
      </div>
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
  justify-content: space-between;
  align-items: center;
  background-color: #E09127;
  color: white;
  width: 100vw;
  height: 50px;
}

.app-name {
  font-size: 1.5em;
  padding-left: 10px;
}

.setting {
  padding: 10px;
}

.link {
  color: white;
}
</style>
