// Imports
import { AudioManager } from './audio-manager.js';

// Constants
const AUDIO_AREA_ID = "game-audio"

/** To be executed when page loads */
function onInit() {
  AudioManager.generateHtmlAudio(AUDIO_AREA_ID)
}

// Run script
onInit();
