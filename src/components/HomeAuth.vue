<template>
  <div class="wrapper">
    <router-link :to="{name: 'Learn'}" class="hvr-grow-rotate green-splash" tag="div"><span>Apprentissage</span></router-link>
    <router-link :to="{name: 'Operation'}" class="hvr-grow-rotate red-splash" tag="div" v-if="canAccessTest()"><span>Evaluation</span></router-link>
  </div>
</template>

<script>
// import utils from '@/services/utils'

export default {
  name: 'homeAuth',
  methods: {
    canAccessTest () {
      // return utils.canAccessTest()
      return true
    }
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  div.green-splash, div.red-splash {
    width: 30vw;
    height: 50vh;
    margin: 0 2rem;
    cursor: pointer;
  }

  div.green-splash {
    background: url("../assets/img/green_splash.svg") no-repeat center center;
    background-size: contain;
  }

  div.red-splash {
    background: url("../assets/img/red_splash.svg") no-repeat center center;
    background-size: contain;
  }

  div.green-splash span, div.red-splash span {
    display: none;
  }

  @media screen and (max-width: 740px) {
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    div.green-splash, div.red-splash {
      width: 60vw;
      height: 30vh;
      margin: 2rem 0;
    }

  }

</style>
