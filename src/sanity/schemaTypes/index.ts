import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { contactMessageType } from "./contactMessageType";
import { customInquiryType } from "./customInquiryType";
import { productInquiryType } from "./productInquiryType";
import { productType } from "./productType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, customInquiryType, productInquiryType, contactMessageType],
};
