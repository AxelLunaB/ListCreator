<template>
    <router-link to="/towerdetail" class="row col-12 router">
        <table class="table table-hover">
            <tbody>
            <tr>
                <td>1</td>
                <td>Sold</td>
                <td>1BDR</td>
                <td>252 M2</td>
                <td>252 M2</td>
                <td>252 M2</td>
                <td>252 M2</td>
                <td>252 M2</td>
                <td>252 M2</td>
            </tr>
            </tbody>
        </table>
  </router-link>
</template>

<script>

export default {
  components: {
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss">

.table-main {
  background:rgb(81,111,77);
  padding: 0;
}

.table td,
.table th {
    padding: 0;
}

.router:hover {
  text-decoration: none!important;
}

@media screen and (max-width: 867px) {
  .title-header {
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
}
</style>
