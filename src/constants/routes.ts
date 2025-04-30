/**
 * 路由配置「拍平」
 * 此为mock路由，实际使用时请根据实际情况修改，应从后端获取
 * 若无需动态路由直接在 configs/router.ts 中配置
 * */
export const MOCK_ROUTES = [
  {
    id: 1,
    path: '/home',
    label: '首页',
    icon: 'home',
    parentId: null,
    component: '/home/index.tsx',
    layout: true,
  },
  {
    id: 2,
    path: '/test',
    label: '测试',
    icon: 'test',
    parentId: null,
    component: '/test/index.tsx',
    layout: true,
  },
];
