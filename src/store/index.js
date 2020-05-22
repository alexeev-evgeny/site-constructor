import isEmpty from 'lodash/isEmpty';
import defaultBlocks from './blocks';
import getHtmlDoc from './getHtmlDoc';

/**
 * Сгенерировать новый id
 */
function getNewId() {
    return new Date().getTime() + Math.round(Math.random() * 10000);
}

/**
 * Открыть html документ
 * @param {string} html
 */
function openHtmlDoc(html) {
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(html);
    newWindow.document.close();
}

/**
 * Получить стор
 */
export default function getStore() {
    return {
        state: {
            rawPage: [],
            blocks: [],
        },
        mutations: {
            blocks(state, value) {
                state.blocks = value;
            },

            /**
             * Добавить блок на страницу
             * @param {State} state
             * @param {Object} block
             */
            addBlock(state, block) {
                if (isEmpty(block)) {
                    return;
                }

                const newBlock = {
                    ...block,
                    id: getNewId(),
                };
                state.rawPage.push(newBlock);
            },

            /**
             * Удалить блок со страницы
             * @param {State} state
             * @param {number} blockId
             */
            removeBlock(state, blockId) {
                const { rawPage } = state;
                state.rawPage = rawPage.filter(({ id }) => id !== blockId);
            },

            /**
             * Обновить блок на странице
             * @param {State} state
             * @param {Object} updatedBlock
             */
            updateBlock(state, updatedBlock) {
                const { rawPage } = state;

                if (isEmpty(updatedBlock)) {
                    return;
                }

                state.rawPage = rawPage.reduce((result, block) => {
                    if (updatedBlock.id === block.id) {
                        result.push(updatedBlock);
                        return result;
                    }
                    result.push(block);
                    return result;
                }, []);
            },
        },
        actions: {
            /**
             * Инициализировать состояние стора
             * @param {Commit} commit
             */
            initState({ commit }) {
                const newBlocks = defaultBlocks.map((block) => ({
                    ...block,
                    id: getNewId(),
                }));
                commit('blocks', newBlocks);
            },

            /**
             * Создать страницу
             * @param {State} state
             * @param {Dispatch} dispatch
             */
            createPage({ state: { rawPage } }) {
                const html = getHtmlDoc(rawPage);
                openHtmlDoc(html);
            },
        },
    };
}
