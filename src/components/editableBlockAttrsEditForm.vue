<script>
import get from 'lodash/get';

export default {
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
    },

    methods: {
        update(event, key) {
            const value = get(event, 'target.value', '');
            this.$emit('update', { key, value });
        },
    },
};
</script>

<template lang="pug">
.attributes-edit-form
    .row(v-for="(attr, key) in attributes")
        span.caption {{attr.name}}
        input.input(
            type="text"
            :value="attr.value"
            @input="update($event, key)"
        )

</template>

<style lang="scss" scoped>
.attributes-edit-form {
    display: block;
    padding: 6px;
    background-color: pink;

    .row {
        display: block;
        margin-top: 6px;
        white-space: nowrap;
        text-align: right;

        &:first-child {
            margin-top: 0;
        }
    }

    .caption,
    .input {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        line-height: 24px;
        box-sizing: border-box;
    }

    .caption {
        padding-right: 6px;
        font-weight: bold;
    }

    .input {
        width: 300px;
        height: 24px;
        padding: 3px;
        border: 0;
    }
}
</style>
