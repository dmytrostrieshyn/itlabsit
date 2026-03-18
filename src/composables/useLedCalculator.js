import { ref } from 'vue';

export function useLedCalculator() {
    const resistance = ref(null);
    const errorMsg = ref('');

    // Функція розрахунку опору: R = (Vs - Vl) / I
    const calculateResistor = (sourceVoltage, ledVoltage, ledCurrent) => {
        errorMsg.value = '';
        resistance.value = null;

        const vSource = parseFloat(sourceVoltage);
        const vLed = parseFloat(ledVoltage);
        const iLed = parseFloat(ledCurrent); // в міліамперах

        // Валідація вхідних даних (це ми будемо перевіряти в тестах!)
        if (isNaN(vSource) || isNaN(vLed) || isNaN(iLed)) {
            errorMsg.value = 'Всі поля мають бути заповнені числами';
            return false;
        }

        if (vSource <= 0 || vLed <= 0 || iLed <= 0) {
            errorMsg.value = 'Значення мають бути більшими за нуль';
            return false;
        }

        if (vSource <= vLed) {
            errorMsg.value = 'Напруга джерела має бути більшою за напругу світлодіода!';
            return false;
        }

        // Розрахунок
        const currentAmps = iLed / 1000;
        const calcR = (vSource - vLed) / currentAmps;
        
        resistance.value = Math.ceil(calcR); // Округлюємо до цілого
        return true;
    };

    return {
        resistance,
        errorMsg,
        calculateResistor
    };
}