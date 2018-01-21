<template>
  <div>
    <h1 class="color-green">Apprentissage</h1>
    <p>Clique sur une des dents du monstre pour choisir la table que tu souhaites apprendre.</p>
    <ul id="times-tables-list">
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
  #times-tables-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 60vw;
    margin-top: 2rem;
  }

  #times-tables-list li {
    cursor: pointer;
    background-image: url("../assets/img/tooth.svg");
    background-size: cover;
    height: 100px;
    width: 150px;
    margin: 1rem;
  }

  #times-tables-list li div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  @keyframes hvr-hang {
    0% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
    }
    50% {
      -webkit-transform: translateY(4px);
      transform: translateY(4px);
    }
    100% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
    }
  }

  @keyframes hvr-hang-sink {
    100% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
    }
  }

  .hvr-hang {
    transform: perspective(1px) translateZ(0);
  }
  .hvr-hang:hover, .hvr-hang:focus, .hvr-hang:active {
    animation-name: hvr-hang-sink, hvr-hang;
    animation-duration: .3s, 1.5s;
    animation-delay: 0s, .3s;
    animation-timing-function: ease-out, ease-in-out;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards;
    animation-direction: normal, alternate;
  }
</style>
