<template>
  <div class="calculator-container" style="max-width: 400px; margin: 2rem auto; font-family: sans-serif;">
    <h2>LED Resistor Calculator</h2>
    <p style="text-align: center; color: green; font-size: 0.9rem;">
  Статус: {{ appStatus }}
</p>
    
    <form @submit.prevent="handleCalculate" style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label>Напруга джерела (V):</label><br>
        <input v-model="form.sourceVoltage" type="number" step="0.1" data-testid="input-source" placeholder="Напр. 5 для USB" />
      </div>
      
      <div>
        <label>Напруга світлодіода (V):</label><br>
        <input v-model="form.ledVoltage" type="number" step="0.1" data-testid="input-led-v" placeholder="Напр. 2.2" />
      </div>

      <div>
        <label>Струм світлодіода (mA):</label><br>
        <input v-model="form.ledCurrent" type="number" data-testid="input-led-i" placeholder="Напр. 20" />
      </div>

      <button type="submit" data-testid="calc-btn" style="padding: 0.5rem; cursor: pointer;">
        Розрахувати
      </button>
    </form>

    <div style="margin-top: 1.5rem; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
      <p v-if="errorMsg" style="color: red;" data-testid="error-message">{{ errorMsg }}</p>
      <p v-else-if="resistance !== null" style="color: green; font-size: 1.2rem;" data-testid="result-message">
        Необхідний резистор: <strong>{{ resistance }} Ом</strong>
      </p>
      <p v-else>Введіть дані для розрахунку.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useLedCalculator } from './composables/useLedCalculator';

const appStatus = import.meta.env.VITE_APP_STATUS;

const { resistance, errorMsg, calculateResistor } = useLedCalculator();

const form = reactive({
  sourceVoltage: '',
  ledVoltage: '',
  ledCurrent: ''
});

const handleCalculate = () => {
  calculateResistor(form.sourceVoltage, form.ledVoltage, form.ledCurrent);
};
</script>