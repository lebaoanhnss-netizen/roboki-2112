// File: src/utils/SoundManager.ts
import { Audio } from 'expo-av';
import { Platform } from 'react-native'; // 👈 Thêm cái này để biết đang chạy trên Web hay Điện thoại

const SOUND_FILES: { [key: string]: any } = {
    correct: require('../../assets/sounds/correct.mp3'),
    wrong: require('../../assets/sounds/wrong.mp3'),
    click: require('../../assets/sounds/click.mp3'),
};

export const playSound = async (name: 'correct' | 'wrong' | 'click') => {
    try {
        // Log ra để thầy bật F12 xem có chạy không
        console.log(`🔊 [${Platform.OS}] Play: ${name}`); 

        // 1. Cấu hình âm thanh (CHỈ DÀNH CHO ĐIỆN THOẠI - WEB BỎ QUA)
        if (Platform.OS !== 'web') {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });
        }

        // 2. Tạo và phát âm thanh
        const { sound } = await Audio.Sound.createAsync(
            SOUND_FILES[name],
            { shouldPlay: true }
        );
        
        // 3. Dọn dẹp bộ nhớ sau khi phát xong
        sound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.isLoaded && status.didJustFinish) {
                await sound.unloadAsync();
            }
        });

    } catch (error) {
        console.error(`❌ Lỗi phát âm thanh [${name}]:`, error);
    }
};