<script>
import get from 'lodash/get';
import clone from 'lodash/clone';

import controls from './editableBlockControls.vue';
import attrsEditForm from './editableBlockAttrsEditForm.vue';

export default {
    components: {
        controls,
        attrsEditForm,
    },

    props: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
        },
        styles: {
            type: String,
            required: false,
        },
        textContent: {
            type: String,
            required: true,
        },
        attributes: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            isContentEditEnable: false,
            attrs: [],
            htmlContent: '',
        };
    },

    created() {
        const attrs = this.attributes
            .map(({ name, value }) => `${name}="${value}"`)
            .join(' ');

        this.htmlContent = this.html
            .replace('$blockContent$', this.textContent)
            .replace('$attrs$', attrs);

        this.attrs = clone(this.attributes);
    },

    methods: {
        edit() {
            this.isContentEditEnable = true;
            this.$refs.wrapper.children[0].setAttribute('contenteditable', true);
        },

        save() {
            this.isContentEditEnable = false;
            this.$refs.wrapper.children[0].setAttribute('contenteditable', false);

            const textContent = get(this.$refs, 'wrapper.children[0].textContent', '');
            const {
                id, name, title, html, styles, attrs,
            } = this;

            this.$emit('save', {
                id, name, title, html, styles, textContent, attributes: attrs,
            });
        },

        remove() {
            this.$emit('remove', this.id);
        },

        updateAttr({ key, value }) {
            const name = get(this.attrs, `${key}.name`, '');
            this.$set(this.attrs, key, { name, value });
            this.$refs.wrapper.children[0].setAttribute(name, value);
        },
    },
};
</script>

<template lang="pug">
.editable-block(:class="{'_with-border': isContentEditEnable}")
    .wrapper(
        ref="wrapper"
        :style="styles"
        v-html="htmlContent"
    )

    controls.controls(
        :class="{'_visible': isContentEditEnable}"
        :isEditEnable="isContentEditEnable"
        @edit="edit"
        @save="save"
        @remove="remove"
    )

    attrsEditForm(
        v-if="isContentEditEnable && attrs.length"
        :attributes="attrs"
        @update="updateAttr"
    )

</template>

<style lang="scss" scoped>
.editable-block {
    display: block;
    position: relative;
    padding: 3px;

    .wrapper {
        outline: none;

        &:focus {
            outline: none;
        }
    }

    &._with-border {
        box-shadow: inset 0 0 0 1px red;
    }

    .controls {
        display: none;
        position: absolute;
        right: 0;
        bottom: 0;

        &._visible {
            display: block;
            position: static;
        }
    }

    &:hover {
        box-shadow: inset 0 0 0 2px red;

        .controls {
            display: block;
        }
    }
}
</style>
