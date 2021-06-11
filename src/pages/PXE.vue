<template>
    <div>
        <div class="titleScreen ">Управление запросами PXE</div>
        <div>
            <q-table
            grid
            :filter="filter"
            :data="data"
            :columns="pxecolumns"
            :rows-per-page-options="[0]"
            hide-header
            hide-bottom
            >
                <template v-slot:item="props" >
                   <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                    <q-card @click="openCard(props.row.id,props.row.City,props.row.Ipv4,props.row.MAC,props.row.tipe,props.row.state)"  :class="(props.row.state==false)?'bg-yellow-1':'bg-green-1'">
                        <!-- <q-list dense class="q-pa-md"> -->
                        <!-- <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name"> -->
                        <q-item>
                        <q-item-section>
                            <div class="titleScreen">#{{ props.row.id }} {{ props.row.City }}</div>
                        </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item >
                        <q-item-section >
                            <q-item-label caption>{{props.cols[2].label}}</q-item-label>
                            <q-item-label >{{ props.row.Ipv4 }}</q-item-label>
                        </q-item-section>
                        </q-item>
                        <q-item >
                        <q-item-section>
                            <q-item-label caption>{{props.cols[3].label}}</q-item-label>
                            <q-item-label >{{ props.row.MAC }}</q-item-label>
                        </q-item-section>
                        </q-item>
                        <q-item >
                        <q-item-section>
                            <q-item-label caption>{{props.cols[4].label}}</q-item-label>
                            <q-item-label >{{ props.row.time }}</q-item-label>
                        </q-item-section>
                        </q-item>
                        <q-item >
                        <q-item-section>
                            <q-item-label caption>{{props.cols[5].label}}</q-item-label>
                            <q-item-label >{{ props.row.type }}</q-item-label>
                        </q-item-section>
                        </q-item>
                        <!-- </q-list> -->
                    </q-card>
                   </div>
                </template>
            </q-table>
    </div>
    <q-dialog v-model="toolbar">
        <pxesetting v-bind:pxedata="pxedata"></pxesetting>
    </q-dialog>
</div>
</template>

<script>
import data from '../../json/pxe.json'
import pxecolumn from '../../json/pxecolumn.json'
import pxesetting from '../components/pxesetting.vue'
export default {
  components: { pxesetting },
    data(){
        return{
            toolbar : false,
            filter : '',
            data : data,
            pxecolumns : pxecolumn,
            pxedata:null
        }
    },
    methods: {
        openCard(id,city,ip,mac,type,state){
            if (state == false) {
                this.pxedata = {
                    'id':id,
                    'city' : city,
                    'ip' : ip,
                    'mac' : mac,
                    'type' : type
                }
                this.toolbar=true}
            console.log("Loc: "+ id + ' ' + city)
        },
    }
}
</script>

<style>
.my-custom-toggle
  {border: 1px solid #027be3}
</style>