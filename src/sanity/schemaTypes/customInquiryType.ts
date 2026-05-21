import { defineField, defineType } from "sanity";

export const customInquiryType = defineType({
  name: "customInquiry",
  title: "Custom Inquiry",
  type: "document",
  fields: [
    defineField({ name: "productLabel", title: "Product / Style", type: "string" }),
    defineField({ name: "quantity", title: "Estimated Quantity", type: "string" }),
    defineField({ name: "targetDate", title: "Target Delivery", type: "string" }),
    defineField({ name: "fullName", title: "Full Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 5 }),
    defineField({
      name: "selectionsSummary",
      title: "Selections Summary",
      type: "text",
      rows: 8,
    }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "new" }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
    },
  },
});
