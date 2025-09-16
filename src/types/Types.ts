export enum FieldType {
  STRING = "string",
  NUMBER = "number",
  SELECT = "select",
  CHECKBOX = "checkbox",
  PASSWORD = "password",
}

export enum KeyboardType {
  ASCII_CAPABLE = "ascii-capable",
  DECIMAL_PAD = "decimal-pad",
  DEFAULT = "default",
  EMAIL_ADDRESS = "email-address",
  NAME_PHONE_PAD = "name-phone-pad",
  NUMBER_PAD = "number-pad",
  NUMBERS_AND_PUNCTUATION = "numbers-and-punctuation",
  NUMERIC = "numeric",
  PHONE_PAD = "phone-pad",
  TWITTER = "twitter",
  URL = "url",
  VISIBLE_PASSWORD = "visible-password",
}

export interface FieldsType {
  name: string;
  type: FieldType;
  keyboard: KeyboardType;
  placeHolder: string;
  label: string;
  error: boolean;
  value: string | number | boolean;
  required: boolean;
  options?: { label: string; value: string }[];
}
