<template>
  <div>
    <button @click="saveProgress">Save</button>
    <input type="file" @change="handleFileChange"/>
  </div>
</template>

<script>
import config from '@/config/config'
import lsm from '@/services/localStorageManager'
import { EventBus } from '@/services/eventBus'
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
      EventBus.$emit('alert', {type: 'success', message: 'Tu as sauvegardé ta progression !'})
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
        EventBus.$emit('alert', {type: 'success', message: 'Tu as récupéré ta progression !'})
      }

      // Lecture du fichier transmis par l'utilisateur.
      reader.readAsText(file)
    }
  }
}
</script>

<style scoped>

</style>
