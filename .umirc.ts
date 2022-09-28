import { defineConfig } from 'umi';
const { flatten } = require('lodash');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/TodoList' }],
  fastRefresh: {},
});
