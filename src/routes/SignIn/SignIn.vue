<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { API_ROUTES } from '../../constants';

const password = ref('password');
const email = ref('jenny@gmail.com');
const router = useRouter();
const store = useStore();
const signin = () => {
  axios
    .post(API_ROUTES.SIGN_IN, {
      email: email.value,
      password: password.value,
    })
    .then(({ data }) => {
      store.commit('setUser', data?.user);
      router.push('/');
    })
    .catch(e => {
      console.log(e);
    });
};
</script>

<template>
  <div class="sign-in">
    <div class="logo">LOGO</div>
    <form @submit.prevent="signin">
      <fieldset>
        <legend>Sign in</legend>
        <div class="form-input">
          <label>
            Email:
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="Your Email address"
              required
            />
          </label>
        </div>
        <div class="form-input">
          <label>
            Passowrd:
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="Your password"
              required
            />
          </label>
        </div>
      </fieldset>
      <CustomButton class="outlined" type="submit">sign in</CustomButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import 'src/global.scss';
.sign-in {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 50vh;
}
.logo {
  height: 5rem;
  width: 5rem;
  background: $brown;
  padding: 1rem;
  border-radius: 5rem;
  margin: $large;
}
form {
  width: 100%;
  .form-input {
    text-align: start;
    margin-bottom: $medium;
  }
  label {
    input {
      width: 100%;
      display: block;
      padding: $medium;
      border-radius: $small;
      border: solid $x-small gray;
      outline: lighten(gray, 50);
    }
  }
  fieldset {
    border: none;
    legend {
      font-size: xx-large;
    }
  }
}
button {
  margin-top: $medium;
  width: 100%;
}

@media (max-width: $mobile) {
  .sign-in {
    width: 100%;
    padding: $medium;
  }
}
</style>
