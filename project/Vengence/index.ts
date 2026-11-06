const screens = {
    start: { x: 1, y: 1 },
    main: { x: 0, y: 1 },
    credits: { x: 1, y: 0 },
    options: { x: 1, y: 2 },
    saves: { x: 2, y: 1 }
};
const wrapper = document.getElementById("wrapper")!;
function goTo(name: keyof typeof screens) {
    const screen = screens[name];
    const x = screen.x * 100;
    const y = screen.y * 100;
    wrapper.style.transform = `translate(-${x}vw, -${y}vh)`;
}
const sliders = document.querySelectorAll<HTMLInputElement>('input[type="range"]');
for (let i = 0; i < sliders.length; i++) {
    const slider = sliders[i];
    const valueDisplay = slider.previousElementSibling!;

    valueDisplay.textContent = slider.value + "%";

    slider.addEventListener("input", function () {
        valueDisplay.textContent = slider.value + "%";
    });
}

const masterVolumeSlider = document.getElementById('master-volume') as HTMLInputElement;
const musicVolumeSlider = document.getElementById('music-volume') as HTMLInputElement;
const effectsVolumeSlider = document.getElementById('effects-volume') as HTMLInputElement;
const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;

if (masterVolumeSlider && musicVolumeSlider && effectsVolumeSlider && bgMusic) {
    const savedMasterVol = localStorage.getItem('masterVolume');
    const savedMusicVol = localStorage.getItem('musicVolume');
    const savedEffectsVol = localStorage.getItem('effectsVolume');

    if (savedMasterVol) masterVolumeSlider.value = savedMasterVol;
    if (savedMusicVol) musicVolumeSlider.value = savedMusicVol;
    if (savedEffectsVol) effectsVolumeSlider.value = savedEffectsVol;

    document.getElementById('master-value')!.textContent = masterVolumeSlider.value + '%';
    document.getElementById('music-value')!.textContent = musicVolumeSlider.value + '%';
    document.getElementById('effects-value')!.textContent = effectsVolumeSlider.value + '%';

    function updateMusicVolume() {
        const masterVol = (masterVolumeSlider.value as unknown as number) / 100;
        const musicVol = (musicVolumeSlider.value as unknown as number) / 100;
        bgMusic.volume = masterVol * musicVol;
    }

    let musicStarted = false;
    function startMusic() {
        if (!musicStarted) {
            musicStarted = true;
            bgMusic.play().catch(() => {});
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keypress', startMusic);
        }
    }
    document.addEventListener('click', startMusic);
    document.addEventListener('keypress', startMusic);

    masterVolumeSlider.addEventListener('input', function () {
        localStorage.setItem('masterVolume', this.value);
        document.getElementById('master-value')!.textContent = this.value + '%';
        updateMusicVolume();
    });

    musicVolumeSlider.addEventListener('input', function () {
        localStorage.setItem('musicVolume', this.value);
        document.getElementById('music-value')!.textContent = this.value + '%';
        updateMusicVolume();
    });

    effectsVolumeSlider.addEventListener('input', function () {
        localStorage.setItem('effectsVolume', this.value);
        document.getElementById('effects-value')!.textContent = this.value + '%';
    });

    updateMusicVolume();
}
