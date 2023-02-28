<script setup lang="ts">
import { computed } from 'vue';

const today = computed(
  () => '?daysOfTheWeek=' + new Date().toString().substring(0, 3)
);
</script>

<template>
  <header>
    <span class="menu-button">show Menu</span>
    <nav>
      <div class="logo"></div>
      <menu>
        <li><router-link :to="today">Menu du jour</router-link></li>
        <li>
          <router-link to="/offers?offerType=food">Nos Menus</router-link>
        </li>
        <li>
          <router-link to="/offers?offerType=salad">Cruditees</router-link>
        </li>
        <li>
          <router-link to="/offers?offerType=drink">Boissons</router-link>
        </li>
      </menu>
      <div class="dropdown">
        <details
          ref="dropdown"
          @mouseenter="e=>(e.target as HTMLDetailsElement).open = true"
          @mouseleave="e=>(e.target as HTMLDetailsElement).open = false"
        >
          <summary>Username</summary>
          <ul>
            <li><router-link to="/my/cart">My Cart</router-link></li>
            <li><router-link to="/my/favorites">My favorites</router-link></li>
            <li><router-link to="/my/orders">My orders</router-link></li>
            <li role="button">Signout</li>
          </ul>
        </details>
      </div>
      <li><router-link to="/sign-in">Sign in</router-link></li>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import 'src/global.scss';
header {
  background: $bg;
  color: #010405;
  a {
    color: #8babf1;
    text-align: center;
    text-decoration: none;
    padding: $large;
    display: block;
    &:hover {
      background: lighten(lightgray, 5%);
    }
  }
  nav {
    display: flex;
    & > * {
      margin: auto;
      list-style-type: none;
    }
  }
  menu {
    display: flex;
    justify-content: center;
    list-style-type: none;
  }
  ul {
    list-style-type: none;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  div.dropdown {
    margin: auto;
  }
  details {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: row;
    margin: auto;
    min-width: 10rem;
    z-index: 1;
    ul {
      background: $bg;
      position: absolute;
      & :hover {
        background: lighten($bg, 5%);
      }
    }
  }
  .logo {
    margin: auto;
    height: 4rem;
    width: 4rem;
    background: $dark;
    position: relative;
    & img {
      border-radius: $medium;
      height: 100%;
      width: auto;
    }
  }
}
.menu-button {
  display: none;
}
@media (max-width: $mobile) {
  .menu-button {
    display: block;
  }
  header {
    nav,
    menu {
      flex-direction: column;
    }
    nav > * {
      width: 100%;
    }
    nav {
      display: none;
    }
    a {
      border-bottom: solid;
      padding: $x-small !important;
    }
    &:hover {
      .menu-button {
        display: none;
      }
      nav {
        display: block;
      }
      details {
        display: block;
        margin: auto !important;
        width: unset !important;
        ul {
          width: 100%;
        }
      }
    }
  }
}
</style>
