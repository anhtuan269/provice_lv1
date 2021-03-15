<template>
  <div id="app">
    <div class="form-control">
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selected"
      >
        <option>Chose Province</option>
        <option
          v-for="(province, index) in provinces"
          :key="index"
          :value="province.id"
        >
          {{ province.name }}
        </option>
      </select>
      <select class="form-select" 
      aria-label="Default select example"
      >
        <option>Chose District</option>
        <template  v-for="(district, index) in districts" :key="index" >
          <option v-show="selected === district.province_id " :value="district.province_id">
            {{ district.name}}
          </option>
        </template>
      </select>
      
    </div>
  </div>
</template>

<script >
export default {
  name: "App",
  data() {
    return {
      provinces: [],
      districts: [],
      selected: "",
      dis:"",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch(
        "https://api.muabannhanh.com/province/list?session_token=cb2663ce82a9f4ba448ba435091e27bb&phone=0362342558"
      )
        .then((json) => json.json())
        .then((res) => {
          if (res.status == 200) {
            res.result.map((p) => {
              this.provinces.push({
                id: p.id,
                name: p.name,
                districts: p.district,
              });
              p.district.map((d) => {
                this.districts.push({
                  id: d.id,
                  name: d.name,
                  province_id: d.province_id,
                });
              });
            });
          }
          console.log(this.provinces);
          console.log(this.districts);
        })
        .catch((err) => alert(err));
    
    },
  },
  components: {},
};
</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .form-control {
  display: grid;
  grid-template-columns: 45% 45%;
  justify-content: space-between;
}
#app .form-control select option {
  cursor: pointer;
}
</style>
