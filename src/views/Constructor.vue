<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import editableBlock from '@/components/editableBlock.vue';

export default {
    components: {
        editableBlock,
    },

    data() {
        return {};
    },

    created() {
        this.initState();
    },

    methods: {
        ...mapActions(['initState', 'createPage']),
        ...mapMutations(['addBlock', 'removeBlock', 'updateBlock']),
    },

    computed: {
        ...mapState(['blocks', 'rawPage']),
    },
};
</script>

<template lang="pug">
.constructor
    .preview
        .block(v-for="block in rawPage")
            editableBlock(
                :key="block.id"
                :id="block.id"
                :name="block.name"
                :title="block.title"
                :html="block.html"
                :textContent="block.textContent"
                :styles="block.styles"
                :attributes="block.attributes"
                @save="updateBlock"
                @remove="removeBlock"
            )

    .blocks
        .row(v-for="block in blocks")
            button.button(@click="addBlock(block)")
                | Добавить "{{block.title}}"

        .row._with-border
            button.button._green(@click="createPage")
                | Создать страницу

</template>

<style scoped lang="scss">
.constructor {
    display: flex;
    min-height: 100vh;

    .preview {
        width: 100%;
        min-height: 800px;
        border: 2px solid gray;
    }

    .blocks {
        width: 300px;
        min-height: 800px;
        padding: 12px;
        box-sizing: border-box;
        background-color: gray;
    }

    .row {
        display: block;
        margin-top: 12px;

        &:first-child {
            margin-top: 0;
        }

        &._with-border {
            padding-top: 12px;
            border-top: 3px solid black;
        }
    }

    .button {
        width: 100%;
        font-size: 15px;
        line-height: 30px;
        cursor: pointer;

        &:hover {
            background-color: white;
            border-color: white;;
        }

        &._green {
            background-color: #66d666;
        }
    }
}
</style>
