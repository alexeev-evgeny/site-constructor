import blocks from '@/store/blocks';
import getHtmlDoc from '@/store/getHtmlDoc';

describe('getHtmlDoc', () => {
    it('Должен сформировать html документ', () => {
        const result = getHtmlDoc(blocks);
        const expected = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset=\"utf-8\" />
                <title>CREATED BY CONSTRUCTOR</title>
            </head>
            <body style=\"font-family: Avenir, Helvetica, Arial, sans-serif;
                text-align: center; width: 800px; margin: 0 auto;\">
                <div style=\"\"> <h1 >Дефолтный заголовок</h1> </div><div style=\"font-size: 18px; line-height: 24px;\"> <div >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> </div><div style=\"font-size: 18px; line-height: 24px;\"> <a href=\"#\">Дефолтный текст ссылки</a> </div><div style=\"max-width: 100%;\"> <image src=\"https://b1.m24.ru/c/1148057.580xp.jpg\" alt=\"#\"/> </div>
            </body>
        </html>`;

        expect(result).toBe(expected);
    });

    it('Не должно формировать html, если ничего не передано', () => {
        const result = getHtmlDoc();
        expect(result).toBe('');
    });
});
