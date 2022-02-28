export interface ICategoryTree {
    id: string | undefined;
    name: string;
    parent_id?: string;
    children?: ICategoryTree[];
}