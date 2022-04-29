export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'registry',
        path: '/user/registry',
        component: './user/registry',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account/center',
    routes: [
      {
        name: 'center',
        path: '/account/center',
        component: './user/center',
      }
    ]
  },
  {
    path: '/blog/create',
    routes: [
      {
        name: 'createBlog',
        path: '/blog/create',
        component: './blog/create',
      }
    ]
  },
  {
    path: '/blog/read',
    routes: [
      {
        name: 'readBlog',
        path: '/blog/read',
        component: './blog/read',
      }
    ]
  },
  {
    path: '/home',
    component: './home'
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
