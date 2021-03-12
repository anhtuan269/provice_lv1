<template>
  <div id="app">
    <div class="form-control">
      <select class="form-select" aria-label="Default select example">
        <option selected>Chose Province</option>
        <option
          v-for="(province, index) in provinces"
          :key="index"
          :value="province.id"
        >
          {{ province.name }}
        </option>
      </select>
      <select class="form-select" aria-label="Default select example">
        <option selected>Chose District</option>
        <option
          :value="district.id"
          v-for="(district, dist_index) in districts"
          :key="dist_index"
        >
          {{ district.name }}
        </option>
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("https://api.muabannhanh.com/province/list?session_token=cb2663ce82a9f4ba448ba435091e27bb&phone=0362342558")
        .then(json => json.json())
        .then((res) => {
          if (res.status == 200) {
            res.result.map((p) => {
              this.provinces.push({
                "id": p.id,
                "name": p.name
              })
              p.district.map((d) => {
                this.districts.push({
                  "id": d.id,
                  "name": d.name
                })
              });
            });
          }
        })
        .catch(err => alert(err));
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
</style>
