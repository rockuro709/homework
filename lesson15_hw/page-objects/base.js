export class Base {
    constructor(page) {
        this.page = page;
    }
        //добавил waitUntil, потому что индикатор загрузки почему-то крутится очень долго и приходится ждать 20 секунд лишних
        async navigate(url) {              
        return this.page.goto(url, {waitUntil: 'domcontentloaded'});  
    }
}