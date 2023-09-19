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
                label: 'Example Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Example input',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/shinput'
            },
            {
                label: 'Example Empty page',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/empty'
            },
            {
                label: 'My empty page for tsts',
                icon: 'pi pi-fw pi-link',
                to: '/pages/shempty'
            },
            {
                label: 'Grid one row select',
                icon: 'pi pi-fw pi-link',
                to: '/pages/shgrid'
            },
            {
                label: 'Grid MultiRowSelect',
                icon: 'pi pi-fw pi-link',
                to: '/pages/shgridmulti'
            },
            {
                label: 'CRUD operation 1',
                icon: 'pi pi-fw pi-link',
                to: '/pages/shtablecrud'
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
