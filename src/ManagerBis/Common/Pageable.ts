export default class Pageable {
    page!: number;
    size!: number;
    sort!: string;
    setSort(column: string,Desc: boolean){
        this.sort = `${column},`+Desc ? "DESC" : "ASC";
    }
}