<template>
  <div
    class="h-screen overflow-hidden w-screen flex justify-center items-center bg-gray-100"
    id="login-page"
  >
    <div class="w-[300px] sm:w-[400px]">
      <a-card :bordered="true" hoverable >
        <template #title>
          <AuthLoginCardTitle />
        </template>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
            <a-button type="primary" html-type="submit">Login</a-button>
            <a-button
              @click="resetForm"
              class="ml-4"
              type="primary"
              html-type="Reset"
              >Reset</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
const router = useRouter()
definePageMeta({
  layout: false,
});

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
  // redirect to /home
  router.push("/home");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  formState.username = "";
  formState.password = "";
  formState.remember = true;
};
</script>

<style scoped>
#login-page {
  background: url("/images/bg.jpg") no-repeat center center;
  background-size: cover;
  /* add filter for the background */
  /* filter: blur(3px); */
  opacity: .9;
}

</style>
