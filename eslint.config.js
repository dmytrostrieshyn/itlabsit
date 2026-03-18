import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.js'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'off'
    }
  }
];