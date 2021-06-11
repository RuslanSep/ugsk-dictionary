<template>

    <q-card class="">
        <q-toolbar>
            <q-toolbar-title><span class="text-weight-bold">#{{this.id}}</span> {{this.city}}</q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-actions style="font-size: 16px;">Параметры деплоя</q-card-actions>
        <q-separator inset color="primary" />
        <div class="column q-pa-md">
            <div class="row items-baseline">
                <div class="q-ma-sm">Имя ПК: </div>   
                <q-input
                dense
                ref="input"
                filled
                v-model="pcName"
                placeholder="Вот сюда"
                :rules="[ PcNameRule ]"
                />
            </div>
            
            <div class="row items-center">
                <div class="q-ma-sm">Новый ПК </div> 
                <q-toggle 
                checked-icon="check"
                unchecked-icon="clear"
                v-model="newPcToggle"
                color="primary"
                keep-color />
            </div>
            <div class="row items-center">
                <div class="q-ma-sm">Размер диска </div>
                <div>
                    <q-btn-toggle
                        v-model="DiskSizeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'Автоматически', value: 'auto'}
                        ]"
                    />
                    <q-btn-toggle
                        v-model="DiskSizeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'Вручную', value: 'manually'}
                        ]"
                    />
                </div>

            </div>
            <div class="row items-center">
                <div class="q-ma-sm">MS Office</div> 
                <div>
                    <q-btn-toggle 
                        v-model="MSOfficeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'Без MS', value: 'none'}
                        ]"
                    />
                    <q-btn-toggle 
                        v-model="MSOfficeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'MSO2013Pro', value: '2013Pro'}
                        ]"
                    />
                    <q-btn-toggle
                        v-model="MSOfficeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'Lible', value: 'lible'}
                        ]"
                    />
                    <q-btn-toggle
                        v-model="MSOfficeToggle"
                        class="my-custom-toggle q-ma-xs"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="[
                        {label: 'MSO2013Stnd', value: '2013Stnd'}
                        ]"
                    />
                </div>
            </div>
            <div class="row items-center">
                <div class="q-ma-sm">TeamViewer HOST </div> 
                <q-toggle 
                checked-icon="check"
                unchecked-icon="clear"
                v-model="TeamViewerToggle"
                color="primary"
                keep-color />
            </div>
            <div class="row items-center">
                <div class="q-ma-sm">VPN клиент </div> 
                <q-toggle 
                checked-icon="check"
                unchecked-icon="clear"
                v-model="VPNToggle"
                color="primary"
                keep-color />
            </div>
        </div>
        <q-card-actions style="font-size: 16px;">Точки Дистрибуции</q-card-actions>
        <q-separator inset color="primary" />
        <div class="row q-pa-md">

            <q-btn class="q-pa-sm q-ma-xs">
                <div>
                    <div style="font-size: 16px;">3511-001</div>
                    <q-separator color="primary" />
                    <div class="row justify-beatwin">
                        <q-icon class="text-green-6 q-ma-xs" name="circle" style="font-size: 1.1em;" />
                        <i class="fas fa-code-branch q-ma-xs"/>
                        <i class="fab fa-windows q-ma-xs"/>
                        <i class="fas fa-file-archive q-ma-xs"/> 2
                    </div>
                </div>
            </q-btn>
            <q-btn class="q-pa-sm q-ma-xs">
                <div>
                    <div style="font-size: 16px;">3511-002</div>
                    <q-separator color="primary" />
                    <div class="row justify-beatwin">
                        <q-icon class="text-green-6 q-ma-xs" name="circle" style="font-size: 1.1em;" />
                        <i class="fas fa-code-branch q-ma-xs"/>
                        <i class="fab fa-windows q-ma-xs"/>
                        <i class="fas fa-file-archive q-ma-xs"/> 2
                    </div>
                </div>
            </q-btn>
        </div>
        <q-card-actions style="font-size: 16px;">Точки Дистрибуции</q-card-actions>
        <q-separator inset color="primary" />
        <div class="row q-pa-md items-betwen">
            <q-icon class="" size="sm" name="info" ></q-icon>
            <div class="" style="font-size: 14px;">Выберите точку дистрибуции..</div>
            
        </div>
    </q-card>
</template>

<script>
export default {
    props:[
        'pxedata'
    ],
    data() {
        return{
            MSOfficeToggle:'',
            DiskSizeToggle:'',
            pcName: '',
            newPcToggle : false,
            TeamViewerToggle:false,
            VPNToggle:false,

            id: this.pxedata.id,
            city : this.pxedata.city,
            ip : this.pxedata.ip,
            mac : this.pxedata.mac,
            type : this.pxedata.type
        }
    },
    methods: {
        PcNameRule(val){
            return new Promise((resolve) => {
                setTimeout(() => {
                    // call
                    //  resolve(true)
                    //     --> content is valid
                    //  resolve(false)
                    //     --> content is NOT valid, no error message
                    //  resolve(error_message)
                    //     --> content is NOT valid, we have error message
                    resolve(!!val || 'Нет имени ПК - нет деплоя!')

                    // calling reject(...) will also mark the input
                    // as having an error, but there will not be any
                    // error message displayed below the input
                    // (only in browser console)
                }, 1000)
            })
        },
        reset () {
        this.$refs.input.resetValidation()  
        }
    }
}
</script>