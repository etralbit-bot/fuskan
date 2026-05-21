import { defineField, defineType } from "sanity";

export const contactMessageType = defineType({
  name: "contactMessage",
  title: "Contact Message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "topic", title: "Topic", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "message", title: "Message", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "new" }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "topic",
    },
  },
});
