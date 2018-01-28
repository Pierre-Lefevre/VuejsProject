<template>
  <div>
    <h2>Votre progression : </h2>
    <button class="hvr-grow btn-primary background-green" @click="saveProgress">Sauvegarder</button>
    <div class="drop-zone">
      <input type="file" @change="handleFileChange" accept="text/plain"/>
      <button class="hvr-grow btn-primary background-green">Charger</button>
    </div>
  </div>
</template>

<script>
import config from '@/config/config'
import lsm from '@/services/localStorageManager'
import { eventBus } from '@/services/eventBus'
import crypto from 'crypto-js'
import fs from 'file-saver'

export default {
  name: 'save-load-progress',
  methods: {
    saveProgress () {
      // Cryptage de la progression de l'utilisateur.
      let ciphertext = crypto.AES.encrypt(lsm.getAllToStringUser(), config.hashKey)
      let blob = new Blob([ciphertext], {type: 'text/plain;charset=utf-8'})

      // Sauvegarde du fichier.
      fs.saveAs(blob, config.backupFileName)
      eventBus.$emit('alert', {type: 'success', message: 'Tu as sauvegardé ta progression !'})
    },
    handleFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.loadProgress(files[0])
      e.target.value = ''
    },
    loadProgress (file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        let content = e.target.result

        // Décryptage de la progression de l'utilisateur.
        let bytes = crypto.AES.decrypt(content.toString(), config.hashKey)

        // Chargement des données reçues dans le localStorage.
        lsm.setAllFromStringUser(bytes.toString(crypto.enc.Utf8))
        eventBus.$emit('alert', {type: 'success', message: 'Tu as récupéré ta progression !'})
      }

      // Lecture du fichier transmis par l'utilisateur.
      reader.readAsText(file)
    }
  }
}
</script>

<style scoped>
  h2 + button {
    margin: 0 1rem;
  }

  .drop-zone {
    display: inline-block;
    position: relative;
  }

  .drop-zone input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
</style>
