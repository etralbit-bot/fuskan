import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers show first on the website.",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "catalogueFile",
      title: "Catalogue File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
      description: "Upload a downloadable catalogue for this category (shown on the /catalogue page).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
