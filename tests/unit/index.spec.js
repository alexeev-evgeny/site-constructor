import Vue from 'vue';
import Vuex from 'vuex';
import getStore from '@/store/index';
import blocks from '@/store/blocks';

Vue.use(Vuex);

describe('Store', () => {
    describe('mutations', () => {
        describe('addBlock', () => {
            const [block] = blocks;

            it('Должен добавлять новый блок', () => {
                const store = new Vuex.Store(getStore());
                store.commit('addBlock', block);
                expect(store.state.rawPage.length).toBe(1);
                expect(store.state.rawPage[0].name).toBe(block.name);
                expect(store.state.rawPage[0].html).toBe(block.html);
            });

            it('Должен добавлять поле id в новый блок', () => {
                const store = new Vuex.Store(getStore());
                store.commit('addBlock', block);

                expect(store.state.rawPage.length).toBe(1);
                expect(store.state.rawPage[0].id).toBeDefined();
            });

            it('Не должен добавлять блок, если ничего не передано', () => {
                const store = new Vuex.Store(getStore());
                store.commit('addBlock');

                expect(store.state.rawPage.length).toBe(0);
                expect(store.state.rawPage[0]).not.toBeDefined();
            });
        });

        describe('removeBlock', () => {
            it('Должен удалить блок с указаным id', () => {
                const store = new Vuex.Store(getStore());
                store.commit('addBlock', blocks[0]);
                store.commit('addBlock', blocks[1]);

                const removableBlock = store.state.rawPage[1];
                store.commit('removeBlock', removableBlock.id);

                expect(store.state.rawPage.length).toBe(1);
                expect(store.state.rawPage[0].id).not.toBe(removableBlock.id);
                expect(store.state.rawPage[0].name).not.toBe(removableBlock.name);
                expect(store.state.rawPage[0].html).not.toBe(removableBlock.html);
            });

            it('Не должен ничего удалять, если не передан id блока', () => {
                const store = new Vuex.Store(getStore());
                store.commit('addBlock', blocks[0]);
                store.commit('addBlock', blocks[1]);

                store.commit('removeBlock');

                expect(store.state.rawPage.length).toBe(2);
                expect(store.state.rawPage[0].name).toBe(blocks[0].name);
                expect(store.state.rawPage[1].name).toBe(blocks[1].name);
                expect(store.state.rawPage[0].html).toBe(blocks[0].html);
                expect(store.state.rawPage[1].html).toBe(blocks[1].html);
            });
        });

        describe('updateBlock', () => {
            it('Должен обновить блок', () => {
                const store = new Vuex.Store(getStore());
                const testBlocks = [blocks[0], blocks[1], blocks[2]];

                testBlocks.forEach((b) => store.commit('addBlock', b));

                const oldBlock = store.state.rawPage[0];
                const newBlock = blocks[3];
                newBlock.id = oldBlock.id;

                store.commit('updateBlock', newBlock);

                expect(store.state.rawPage.length).toBe(testBlocks.length);
                expect(store.state.rawPage[0]).toEqual(newBlock);
            });

            it('Не должен обновлять блоки, если ничего не передано', () => {
                const store = new Vuex.Store(getStore());
                const testBlocks = [blocks[0], blocks[1], blocks[2]];

                testBlocks.forEach((b) => store.commit('addBlock', b));

                store.commit('updateBlock');

                expect(store.state.rawPage.length).toBe(testBlocks.length);
                testBlocks.forEach((b, i) => {
                    expect(store.state.rawPage[i].name).toBe(b.name);
                    expect(store.state.rawPage[i].title).toBe(b.title);
                    expect(store.state.rawPage[i].html).toBe(b.html);
                    expect(store.state.rawPage[i].textContent).toBe(b.textContent);
                    expect(store.state.rawPage[i].attributes).toEqual(b.attributes);
                });
            });
        });
    });

    describe('action', () => {
        describe('initState', () => {
            it('Должен добавить дефолтные блоки в state', () => {
                const store = new Vuex.Store(getStore());

                expect(store.state.blocks).toEqual([]);

                store.dispatch('initState');

                expect(store.state.blocks.length).toBe(blocks.length);
                blocks.forEach((b, i) => {
                    expect(store.state.blocks[i].name).toBe(b.name);
                    expect(store.state.blocks[i].title).toBe(b.title);
                    expect(store.state.blocks[i].html).toBe(b.html);
                    expect(store.state.blocks[i].textContent).toBe(b.textContent);
                    expect(store.state.blocks[i].attributes).toEqual(b.attributes);
                });
            });

            it('Должен добавить поля id к дефолтным блокам', () => {
                const store = new Vuex.Store(getStore());
                expect(store.state.blocks).toEqual([]);

                store.dispatch('initState');

                expect(store.state.blocks.length).toBe(blocks.length);
                blocks.forEach((b, i) => {
                    expect(store.state.blocks[i].id).toBeDefined();
                });
            });
        });
    });
});
