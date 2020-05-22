export default function getHtmlDoc(rawPage) {
    if (!rawPage || !Array.isArray(rawPage)) {
        return '';
    }

    const bodyContent = rawPage.reduce((result, {
        html, textContent, attributes, styles,
    }) => {
        const attrs = attributes
            .map(({ name, value }) => `${name}="${value}"`)
            .join(' ');
        const htmlBlock = html
            .replace('$blockContent$', textContent)
            .replace('$attrs$', attrs);

        result.push(`<div style="${styles}"> ${htmlBlock} </div>`);
        return result;
    }, []).join('');

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>CREATED BY CONSTRUCTOR</title>
            </head>
            <body style="font-family: Avenir, Helvetica, Arial, sans-serif;
                text-align: center; width: 800px; margin: 0 auto;">
                ${bodyContent}
            </body>
        </html>`;
}
