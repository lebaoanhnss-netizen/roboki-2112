// File: src/utils/SoundManager.ts
import { Audio } from 'expo-av';

// 1. Khai báo file
const SOUNDS: any = {
    correct: require('../../assets/sounds/correct.mp3'),
    wrong:   require('../../assets/sounds/wrong.mp3'),
    click:   require('../../assets/sounds/click.mp3'),
};

// 2. Hàm phát cực ngắn
export const playSound = async (name: 'correct' | 'wrong' | 'click') => {
    try {
        // Tạo và phát luôn (Fire and Forget)
        const { sound } = await Audio.Sound.createAsync(
            SOUNDS[name], 
            { shouldPlay: true } // <- Lệnh này bảo nó: "Load xong phát ngay cho tao!"
        );
        
        // Mẹo cho Web Mobile: Đôi khi nó lười không tự chạy, bồi thêm 1 lệnh này
        await sound.playAsync(); 

    } catch (error) {
        // Kệ lỗi, không cần log ra làm gì cho rối mắt
    }
};