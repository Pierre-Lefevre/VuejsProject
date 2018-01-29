<template>
  <div>
    <h2>Tes succès</h2>
    <ul id="achievements">
      <li :key="i" v-for="(achievement, i) in achievements" :class="achievement.unlock ? 'unlock' : ''">
        <span class="achievement-unlock" v-if="achievement.unlock"></span>
        <span class="achievement-lock" v-if="!achievement.unlock"></span>
        <span class="achievement-name">{{ achievement.name }}</span>
        <span class="achievement-message">{{ achievement.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '@/config/config'
import lsm from '@/services/localStorageManager'

export default {
  name: 'achievements',
  data () {
    return {
      achievements: []
    }
  },
  created () {
    // Récupère les succès définis dans la configuration.
    this.achievements = config.achievements

    // Récupère les succès pour un utilisateur.
    let achievementsUser = lsm.getValueUser('achievements')

    // Définit pour chaque succès un booléen qui indique s'il est débloqué ou non.
    Object.keys(this.achievements).forEach((key) => {
      this.achievements[key].unlock = achievementsUser[key]
    })
  }
}
</script>

<style scoped>
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  #achievements {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  #achievements li {
    width: 150px;
    margin: 20px;
    background-color: #F3F4F5;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: 4px solid #F3F4F5;
  }

  #achievements li.unlock {
    padding-top: 21px;
  }

  .achievement-unlock {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: -29px;
    left: 0;
    right: 0;
    margin: auto;
    background: #4E950B url("../assets/img/checked.svg") no-repeat center center;
    background-size: 50%;
  }

  .achievement-lock {
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    left: -4px;
    top: -4px;
    border-radius: 4px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
  }

  #achievements li .achievement-name {
    font-weight: bold;
    padding: 10px;
    text-align: center;
  }

  #achievements li:not(.unlock) .achievement-name {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #achievements li .achievement-message {
    padding: 10px;
    background-color: white;
    border-radius: 4px;
  }
</style>
