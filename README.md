# Learning  primevue using SAKAI template

I have taken [SAKAI template](https://github.com/primefaces/sakai-vue) and customise it for my needs
## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
### Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).
### Project Setup
```sh
npm install
```
#### Compile and Hot-Reload for Development
```sh
npm run dev
```
#### Compile and Minify for Production
```sh
npm run build
```
#### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```
## How to cut minimal template from SAKAI.

### Create a minimal vue3 app

```bash
    npm create vue@latest
    npm install primevue primeicons primeflex
```

### Copy main files from SAKAI template to your project

```text
App.vue
min.js
vite.config.js 
``````

### Copy folders  from SAKAI template to your project


```text
# assets contains css
assets

# contains main screen and manu
layout

# contains routers defenition. Do not foget  delete menu which is  not nesesarry
routers

# It is as you wish. This folder contains http calls  
service

# As you wish. Personally I copy only pages catalog
View/pages

#  publoc foder contains themes css
public
```

### Edit routers in routers/index.js

```js
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
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/pages/shgrid',
                    name: 'MY PAGE',
                    component: () => import('@/views/pages/SHTable.vue')
                }

            ]
        }
    ]
});

export default router;

```

### Edit menu builder layout/AppMenu.vue

The key "to" should point to the key "path" from router/index.js

```js
<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([

    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/timeline'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            },
            {
                label: 'MyGrid',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/shgrid'
            }

        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
          
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
          
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    <!--    
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
    -->    
    </ul>
</template>

<style lang="scss" scoped></style>


```

### run application


```bash
npm run dev

```

## Making different grids


