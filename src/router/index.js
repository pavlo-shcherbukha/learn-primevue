import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/pages/shinput',
                    name: 'input',
                    component: () => import('@/views/pages/Input.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/shempty',
                    name: 'my empty page for tests',
                    component: () => import('@/views/pages/ShEmpty.vue')
                },
                {
                    path: '/pages/shgrid',
                    name: 'Grid OneRow',
                    component: () => import('@/views/pages/SHTable.vue')
                },
                {
                    path: '/pages/shgridmulti',
                    name: 'Grid MultiRowSelect',
                    component: () => import('@/views/pages/SHTableMulti.vue')
                },
                {
                    path: '/pages/shtablecrud',
                    name: 'CRUD operation 1',
                    component: () => import('@/views/pages/SHTableCRUD.vue')
                }


            ]
        }
    ]
});

export default router;
