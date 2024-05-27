<template>
    <div class="absolute top-0 left-0 z-40 w-full h-full bg-black opacity-30">
    </div>
    <div class="spinner z-50">
    </div>
</template>

<style scoped>
.spinner {
    top: 48%;
    left: 48%;
    position: absolute;
    z-index: 9999;
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-left-color: #EF4444;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>