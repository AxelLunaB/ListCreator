<template>
      <i class="fas fa-arrow-circle-left fa-2x" :class="{ fadeInAnimation: isAnimated }"></i>
</template>

<script>
export default {
  data() {
    return {
      isAnimated:true
    }
  }
}
</script>

<style>
/* #return {
  color: white;
  position: fixed;git
  left: 40px;
  top:80px;
  z-index: 30;
} */

.fadeInAnimation {
    animation: fadeInAnimation 1s forwards;
}

@keyframes fadeInAnimation {
  0%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  40%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  100% {
    opacity: 1;
    transform: translateY(5px);
    }
}

</style>
