export class Menu {
    label: string;
    constructor(public id: number,
        //public label: string,
        public title: string | null,
        public routerLink: string | null,
        public href: string | null,
        public target: string | null,
        public hasSubMenu: boolean,
        public parentId: number) { }
} 