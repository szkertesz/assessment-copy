export interface IBookItem {
    title: string;
    author: string;
    description: string;
    reading: boolean;
    read: boolean;
    id: number;
}

export type IBookItemId = Pick<IBookItem, 'id'>;
export type IBookItemStatus = Pick<IBookItem, 'id' | 'read'>;