import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContent } from './blockContentType'
import { orderType } from './orderType'
import { salesType } from './salesType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, categoryType, productType, orderType, salesType],
}
