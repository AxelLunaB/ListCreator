<template>
   <a href="#top">
    <div id="nav-top-menu" v-scroll="handleScroll" class="hide-menu-arrow">
      <i class="fas fa-arrow-up is-size-5"></i>
    </div>
  </a>
</template>

<script>
export default {

 data() {
    return {
      isVisible: false
    };
  },
  methods: {
    handleScroll: function (evt, el) {
      if(window.scrollY >= 500 && !this.isVisible) {
          let element = document.getElementById("nav-top-menu")
           element.classList.add("show-menu-arrow")
           element.classList.remove("hide-menu-arrow")
          this.isVisible = true
      }else if (window.scrollY <= 500 && this.isVisible) {
          let element = document.getElementById("nav-top-menu")
           element.classList.add("hide-menu-arrow")
           element.classList.remove("show-menu-arrow")
          this.isVisible = false
      }
    }
  },
  directives: {
    scroll: {
      inserted: function (el, binding) {
        let f = function (evt) {
          if (binding.value(evt, el)) {
            window.removeEventListener('scroll', f)
            }
          }
          window.addEventListener('scroll', f)
          }
        }
      }
    }
</script>

<style>

.nav-button {
  color:white;
  transition:0.2s;
}

.nav-button:hover {
  color:rgb(187, 187, 187);
  transition:0.2s;
  border:1px solid rgb(187, 187, 187);
}

.fa-arrow-up {
  position:fixed;
  right: 10px;
  bottom: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #009991e3;
  border-radius: 100px;
  transition: 1s;
}

#nav-top i {
  color: white;
}

#top {
  width: 1px;
  height: 1px;
  position:absolute;
  top: 0;
}

.show-menu-arrow * {
   animation: menuAnimationIn 1s forwards;
}

@keyframes menuAnimationIn {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  20%{
    opacity: 0.5;
    transform: scale(1.2);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
}

.hide-menu-arrow * {
   animation: menuAnimationOut 1s forwards;
  cursor: none;
}

@keyframes menuAnimationOut {
   0% {
    opacity: 1;
  }
  20%{
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(0.1);
  }
}

</style>
