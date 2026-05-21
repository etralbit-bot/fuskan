import { defineField, defineType } from "sanity";

export const productInquiryType = defineType({
  name: "productInquiry",
  title: "Product Inquiry",
  type: "document",
  fields: [
    defineField({ name: "productName", title: "Product Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "productSlug", title: "Product Slug", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "fullName", title: "Full Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 4 }),
    defineField({ name: "selectionsJson", title: "Selections (JSON)", type: "text", rows: 10 }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "new" }),
  ],
  preview: {
    select: {
      title: "productName",
      subtitle: "fullName",
    },
  },
});
