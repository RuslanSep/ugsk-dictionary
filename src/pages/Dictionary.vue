<template>
  <div>
    <div class="wrapper" style="height:100%">
      <div class="row nowrap justify-between q-pa-md search">
        <q-input class="col" rounded outlined  bottom-slots v-model="filter" placeholder="Введите ваш запрос" style="height: 60px;">          
          <template v-if="filter" v-slot:append>
            <q-icon name="close" @click="filter = ''" class="cursor-pointer q-pr-sm" />
          </template>
          <template v-else v-slot:append>
            <q-icon name="search" class="q-pr-sm" />
          </template>
        </q-input>
         <q-btn
         rounded
          class="col q-ml-md exportbutton"
          color="primary"
          icon-right="archive"
          title="Экспорт в Excel"
          no-caps
          @click="exportFiltered"
        />
      </div>
      <div class="q-pa-md" style="descTable">
        <div >
          <q-table
          :pagination.sync="pagination"
          :grid="$q.screen.lt.md"
          :filter="filter"
          :filter-method="filterArray"
          ref="tb"
          :data="getuserdata"
          :columns="getusercolumns"
          :visible-columns="myCols"
          :rows-per-page-options="[10]"
          class="my-sticky-header-table"
          no-results-label="Ничего не найдено, попробуйте ввести другой запрос"
          no-data-label="Извините, но в данный момент вы не сможете воспользоваться справочником"
          >
            <template v-slot:body="props" >
              <q-tr v-if=(props.row.Name) :props="props" :class="(props.row.Enabled==false)?'bg-yellow-2':'bg-white text-black'">
                <q-td class="jpegPhoto" key="jpegPhoto" :props="props">
                  <q-avatar color="grey">
                    <img v-if="props.row.thumbnailPhoto != null" v-bind:src="'data:image/png;base64,'+ props.row.thumbnailPhoto" />
                    <q-icon v-else color="white" style="font-size: 40px;" name="person"></q-icon>
                  </q-avatar>
                </q-td>
                <q-td class="Name" key="Name" :props="props">
                  {{ props.row.Name }}
                </q-td>
                <q-td class="OfficePhone" key="OfficePhone" :props="props">
                    <p :title="props.row.OfficePhone" class="clip"><a :href="'tel:' + props.row.OfficePhone">{{ props.row.OfficePhone }}</a></p>
                </q-td>
                <q-td class="mail" key="mail" :props="props">
                    <a :href="'mailto:' + props.row.mail">{{ props.row.mail }}</a>
                </q-td>
                <q-td class="Title" key="Title" :props="props">
                    <p :title="props.row.Title" class="clip">{{ props.row.Title }}</p>
                </q-td>
                <q-td class="OU"  key="OU" :props="props">
                  <p :title="props.row.OU" class="clip">{{ props.row.OU }}</p>
                </q-td>
                <q-td class="Department" key="Department" :props="props">
                    <p :title="props.row.Department" class="clip">{{ props.row.Department }}</p>
                </q-td>
              </q-tr>
            </template>

            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                <q-card   :class="(props.row.Enabled==false)?'bg-yellow-2':'bg-white text-black'">
                  <q-separator />
                  <q-list dense class="q-pa-md">
                  <!-- <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name"> -->
                  <q-item>
                    <q-item-section style="position:relative;">
                        <q-item-label caption>{{props.cols[1].label}}</q-item-label>
                        <q-item-label style="max-width: 75%" class="wrap">{{ props.row.Name }}</q-item-label>
                      <q-avatar style="position:absolute; top:5px; right:5px; " color="grey">
                        <img v-if="props.row.thumbnailPhoto != null" v-bind:src="'data:image/png;base64,'+ props.row.thumbnailPhoto" />
                        <q-icon v-else color="white" style="font-size: 40px;" name="person"></q-icon>
                      </q-avatar>
                    </q-item-section>

                  </q-item>
                  <q-item >
                    <q-item-section>
                      <q-item-label caption>{{props.cols[2].label}}</q-item-label>
                      <q-item-label >{{ props.row.OfficePhone }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item >
                    <q-item-section>
                      <q-item-label caption>{{props.cols[3].label}}</q-item-label>
                      <q-item-label >{{ props.row.mail }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item >
                    <q-item-section>
                      <q-item-label caption>{{props.cols[4].label}}</q-item-label>
                      <q-item-label >{{ props.row.Title }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item >
                    <q-item-section>
                      <q-item-label caption>{{props.cols[5].label}}</q-item-label>
                      <q-item-label >{{ props.row.OU }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>
            <template class="row justify-center" v-slot:bottom>
              <q-btn :style="($q.screen.lt.md) ? 'display: none':''" no-caps label="Нашли ошибку?" color="primary" @click="warnModal = true" />
              <div class="q-pa-sm flex flex-center">
                <q-pagination
                  v-model="pagination.page"
                  :max="pagesNumber"
                  :max-pages="($q.screen.lt.sm) ? 3 : 6"
                  color="primary"
                  boundary-numbers
                />
              </div>
            </template>
          </q-table>
        </div>
      </div>
      <div :class="($q.screen.lt.sm) ? 'column items-center q-px-md':'row justify-between q-px-md'" :style="($q.screen.lt.md)? '':'justify-content:flex-end;'">
        <q-btn :class="($q.screen.lt.sm) ? 'q-mb-sm':''" :style="($q.screen.lt.md) ? 'max-width: 150px':'display: none'" no-caps label="Нашли ошибку?" color="primary" @click="warnModal = true" />
        <p >Телефон тех. поддержки:
          <a :href="'tel:' + '+73467357220'">+73467357220</a> или <a :href="'tel:' + '500220'">500220</a>
        </p>
      </div>
    </div>
    <q-dialog v-model="warnModal">
                <q-card style="height: 350px !important; width: 350px">
                  <q-toolbar>
                    <q-icon class="q-pa-xs" style="font-size:35px" name="eva-alert-circle-outline"/>
                    <q-toolbar-title class="q-pa-sm">Нашли ошибку?</q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup @click="SearchErr = ''" />
                  </q-toolbar>
                  <q-card-section>
                    <q-input
                    placeholder="Укажите здесь вашу ошибку"
                    v-model="SearchErr"
                    required
                    type="textarea"
                    :rules="[val => !!val || 'Обязательное поле']"
                    ></q-input>
                    <div class="row justify-end">
                    <!-- <q-btn class="q-mx-sm" no-caps label="Отмена" v-close-popup color="red-9" @click="SearchErr = ''" /> -->
                    <q-btn class="q-ml-sm" no-caps label="Отправить" type="submit" color="positive" />
                    </div>
                  </q-card-section>
                </q-card>
              </q-dialog>
  </div>
</template>

<script >
const jsondata = require('../getuser.json')
import jsondatacolumns from "../columns.json"
import { exportFile } from 'quasar'



function wrapValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : String(val)

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)
  formatted = formatted.split(';').join(',')
  formatted = formatted.split(',').join('/')
  formatted = formatted.split('+').join('')
  formatted = formatted.split(null).join('')

  return `${formatted}`
}
export default {
  data(){
    return{
      warnModal: false,
      filter: '',
      SearchErr:'',
      getusercolumns: jsondatacolumns,
      myCols: ['Name','OfficePhone','mail','Title','Department','OU'],
      getuserdata: jsondata,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        // rowsNumber: xx if getting data from a server
      },
    }
  },
  methods:{

     doSomething () {
      // this method has been called (in this case)
      // because @show event was triggered by QBogus component
    },
    doSomethingElse () {
      // this method has been called (in this case)
      // because @hide event was triggered by QBogus component
    },

    filterArray(rows, terms, cols = this.computedCols, cellValue = this.getCellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      const termsArray = lowerTerms.split(' ')
      termsArray.forEach( valSearch => {
        rows = rows.filter(
          row => cols.some(col => {
            const val = cellValue(col, row) + ''
            const haystack = (val === 'undefined' || val === 'null') ? ' ' : val.toLowerCase()
            return haystack.indexOf(valSearch) !== -1
          })
        )
      })
      return rows
    },
    exportFiltered () {
      // naive encoding to xls format
      const content = [ this.getusercolumns.map(col => wrapValue(col.label)).join(';') ].concat(
        this.$refs.tb.filteredSortedRows.map(row => this.getusercolumns.map(col => wrapValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(';'))
      ).join('\r\n')
      const status = exportFile(
        'table-export.csv',
        "\ufeff" + content,
        'text/csv'
      )
      if (status !== true) {
        this.$q.notify({
          message: 'Не удалось скачать файл...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },
  computed: {
    pagesNumber () {
      if (this.filter != '') {return Math.ceil(this.$refs.tb.filteredSortedRows.length / this.pagination.rowsPerPage)}
      else {return Math.ceil(this.getuserdata.length / this.pagination.rowsPerPage)}
    }
  }
}


</script>

<style>
.q-table__bottom{
  justify-content: space-between;
}
textarea{
  height: 200px !important;
  resize: none;
}
p{
  font-size: 13px;
  margin: 0%;
}
p.clip{
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.q-card{
  height:250px !important;
}
.descTable{
  width: 80%;
}
.times-header{
  text-align: center;
  background-color: #c4c4c4;
  height: 60px;
}
.wrapper{
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
    border: none;
    border-radius: 0;
    background: none;
    padding: 6px 15px;
}
.exportbutton{
  max-height: 56px;
  max-width: 56px !important;
}
.jpegPhoto {
  max-width: 80px;
}
.Name {
  max-width: 250px;
}
.OfficePhone {
  max-width: 150px;
}
.mail {
  max-width: 190px;
}
.Title {
  max-width: 150px;
}
.OU {
  max-width: 150px;
}
.Department {
  max-width: 150px;
}


@media (max-width: 1023px) {
  .q-table__bottom{
    flex-direction: column;
  }
  .exportbutton{
    display: none;
  }
}
@media (max-width: 840px){
  .wrapper {
    padding: 20px;
  }
  .search{
    padding-top:0px;
    padding-bottom:0px;
  }
  .q-card{
    max-height:100% !important;
  }
}

@media (max-width: 599px){
  .my-sticky-header-table{
    align-items:center;
  }
  .wrapper {
    padding: 5px;
  }
  .q-card{
    height:100% !important;
  }
}
@media (max-width: 319px){
  .q-card{
    height:100% !important;
}
  .wrapper {
    padding: 5px;
}
}
</style>
<style lang="sass">
  .my-sticky-header-table

  .q-table__top,
  thead tr:first-child th
    background-color: #1976d2
    color: white
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
</style>
