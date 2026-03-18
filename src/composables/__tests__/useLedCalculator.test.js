import { describe, it, expect } from 'vitest';
import { useLedCalculator } from '../useLedCalculator';

describe('useLedCalculator', () => {
  it('коректно розраховує опір для звичайних значень', () => {
    const { resistance, calculateResistor } = useLedCalculator();
    const isSuccess = calculateResistor(5, 2.2, 20);
    
    expect(isSuccess).toBe(true);
    expect(resistance.value).toBe(140); // (5 - 2.2) / 0.02 = 140
  });

  it('повертає помилку, якщо введені не числа', () => {
    const { errorMsg, calculateResistor } = useLedCalculator();
    calculateResistor('текст', 2.2, 20);
    
    expect(errorMsg.value).toBe('Всі поля мають бути заповнені числами');
  });

  it('повертає помилку, якщо значення менші або дорівнюють нулю', () => {
    const { errorMsg, calculateResistor } = useLedCalculator();
    calculateResistor(5, -2, 20);
    
    expect(errorMsg.value).toBe('Значення мають бути більшими за нуль');
  });

  it('повертає помилку, якщо напруга джерела менша за напругу діода', () => {
    const { errorMsg, calculateResistor } = useLedCalculator();
    calculateResistor(2, 3, 20); // Джерело 2V, діод 3V
    
    expect(errorMsg.value).toBe('Напруга джерела має бути більшою за напругу світлодіода!');
  });

  it('коректно округлює розрахований опір до більшого цілого', () => {
    const { resistance, calculateResistor } = useLedCalculator();
    calculateResistor(5, 3.3, 15); // (5 - 3.3) / 0.015 = 113.333...
    
    expect(resistance.value).toBe(114); // Має округлити до 114
  });
});