<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { SET_TOKEN } from "@/utils/user";

let $route = useRoute();

SET_TOKEN(JSON.stringify($route.query));

let html = document.querySelector("html");
html.style.display = "none";
</script>
<style scoped lang="scss"></style>
