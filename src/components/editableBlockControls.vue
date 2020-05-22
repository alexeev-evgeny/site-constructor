<script>
export default {
    props: {
        isEditEnable: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<template lang="pug">
.controls
    button.button(
        v-if="!isEditEnable"
        @click="$emit('edit')"
    )
        | Редактировать

    button.button(
        v-if="isEditEnable"
        @click="$emit('save')"
    )
        | Сохранить

    button.button(
        @click="$emit('remove')"
    )
        | Удалить

</template>

<style lang="scss" scoped>
.controls {
    padding: 6px;
    background-color: pink;
    text-align: right;

    .button {
        width: 120px;
        font-size: 12px;
        line-height: 18px;
        cursor: pointer;

        &:hover {
            background-color: white;
            border-color: white;
        }
    }
}
</style>
