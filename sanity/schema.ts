import { type SchemaTypeDefinition } from "sanity"
import { product } from "./schemas/product-schema"
import { category } from "./schemas/categories-schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , category],
}
