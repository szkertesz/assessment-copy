import { IBookItem } from "../book-item/book-item.interface"

export type IBookItemId = Pick<IBookItem, 'id'>;
export type IBookItemStatus = Pick<IBookItem, 'read'>