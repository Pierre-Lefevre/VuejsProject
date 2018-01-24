<template>
  <div>
    <h1 class="color-green">Apprentissage</h1>
    <p>Clique sur une des dents du monstre pour choisir la table que tu souhaites apprendre.</p>
    <ul class="list">
      <li :key="n" v-for="n in 10" class="hvr-hang">
        <router-link :to="{name: 'OperationTable', params: {id: n}}" tag="div"><span>{{ n }}</span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'learn'
}
</script>

<style scoped>
  .list li {
    height: 100px;
    width: 150px;
    background-image: url("../assets/img/tooth.svg");
    background-size: cover;
  }
</style>
