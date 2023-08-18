<template>
    <div id="app" >
        <NavBar />
        <br />
        <b-row  class="container
          mx-auto
          md:flex md:justify-between md:items-center">
            <b-col >
                <router-view></router-view>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import '@/assets/tailwind.css';

export default {
  components: {
    NavBar,
  },
};
</script>

