import SortWrap from "@/ManagerBis/Common/SortWrap";

export default class PageWrap<T>{
    content!: T[];
    first!: boolean;
    numberOfElements!: number;
    empty!: boolean;
    totalPages!: number;
    last!: boolean;
    totalElements!: number;
    size!: number;
    number!: number;
    sort!: SortWrap;
}