let app = Vue.createApp({
	data: () => {
      return {
      	searchQuery: '',
      	gridColumns: ['name', 'power'],
      	gridData: [
          { name: 'Chuck Norris', power: Infinity},
          { name: 'Bruce Lee', power: 9000},
          { name: 'Jakie Chan', power: 7000},
          { name: 'Jet Li', power: 8000 }
      	]
      }
	}
})

app.component('demo-grid', {
  props: ['data', 'columns', 'filter_key'],
  replace: true,
  template: `
      <table v-if="filteredData.length">
        <thead>
          <tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key.toUpperCase() }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredData">
            <td v-for="key in columns">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No matches found.</p>
  `,
  data: function () {
    let sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })  
    return {
    	sortKey: '',
    	sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
    	let sortKey = this.sortKey
    	let filterKey = this.filter_key && this.filter_key.toLowerCase()
    	let order = this.sortOrders[sortKey] || 1
    	let data = this.data
    	if (filterKey) {
    		data = data.filter((row) => {
              return Object.keys(row).some((key) => {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
              })
    		})
    	}
    	if (sortKey) {
    		data = data.slice().sort((a, b) => {
              a = a[sortKey]
              b = b[sortKey]
              return (a == b ? 0 : a > b ? 1 : -1) * order
    		})
    	}
    	return data
    }
  },
/*  filters: {
    capitalize (str) {
    	console.log('str = ', str)
    	return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },  */
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      console.log('key = ', key)
    }
  }
})

app.mount('#app')