import { defineField, defineType } from "sanity";

export const categoriy = defineType({

    name: "category",
    title: "Categories",
    type: "document",
    fields: [
        defineField({
            name: "categoryName",
            title: "Category Name",
            type: "string",

        }) 
       
        
    ],
    });
