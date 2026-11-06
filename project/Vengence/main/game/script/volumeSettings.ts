function applyVolumeSettings() {
    const masterVol = ((localStorage.getItem('masterVolume') || 80) as number) / 100;
    const musicVol = ((localStorage.getItem('musicVolume') || 80) as number) / 100;
    const effectsVol = ((localStorage.getItem('effectsVolume') || 60) as number) / 100;

    const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement | null;
    const attackSound = document.getElementById('attackSound') as HTMLAudioElement | null;

    if (backgroundMusic) backgroundMusic.volume = masterVol * musicVol;
    if (attackSound) attackSound.volume = masterVol * effectsVol;
}
let gameMusicStarted = false;
function startGameMusic() {
    if (!gameMusicStarted) {
        gameMusicStarted = true;
        const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement | null;
        if (backgroundMusic) {
            backgroundMusic.play().catch(() => {});
        }
        document.removeEventListener('click', startGameMusic);
        document.removeEventListener('keydown', startGameMusic);
    }
}
document.addEventListener('click', startGameMusic);
document.addEventListener('keydown', startGameMusic);

window.startGameMusic = startGameMusic;
window.gameMusicStarted = () => gameMusicStarted;

window.addEventListener('storage', applyVolumeSettings);
