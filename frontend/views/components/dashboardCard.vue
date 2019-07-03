<template>
  <div class="column is-3-desktop is-4-tablet is-12-mobile">
    <div class="dashboard-card">
      <div class="dashboard-avatar-container">
        <div class="dashboard-avatar">
          <img :src="`/static/img/clusters/${count.code}.png`" :alt="count.name">
        </div>
      </div>
      <div class="dashboard-card-content">
        <div class="columns is-multiline is-mobile">
          <div class="column is-6 is-5-mobile" style="height: 50px; padding:5px!important;" v-for="s in count.status" :key="s.id">
            <div class="dashboard-status-circle" :style="`background-color: ${s.color}`">
              {{s.total}}
            </div>
            <div class="dashboard-status-name"> {{s.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardCard",
  props: ["count"]
};
</script>
<style scoped>
.dashboard-card {
  position: relative;
  height: 250px;
  background-color: #e62828;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.dashboard-avatar-container {
  height: 100px;
  width: 100%;
  position: relative;
}
.dashboard-avatar {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #5c5f52;
  border-color: rgb(87, 90, 77);
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  padding: 2.5px;
}
.dashboard-avatar img {
  bottom: 0;
  left: 0;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  right: 0;
  top: 0;
}

.dashboard-card-content {
  position: absolute;
  height: 150px;
  width: 100%;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 10px;
}

.dashboard-status-circle {
  display: inline-block;
  border-radius: 50%;
  color: black;
  padding: 2px;
  width: 25px;
  max-width: 20%;
  height: 25px;
  text-align: center;
}

.dashboard-status-name {
  max-width: 80%;
  position: relative;
  display: inline-block;
  font-size: 14px;
  text-overflow: ellipsis;
  height: 50px;
}
</style>
