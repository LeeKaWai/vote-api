import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'Members';
export const Schema = new MongooseSchema(
  {
    email: { type: SchemaTypes.String, required: true, unique: true }, // email address
    idCard: { type: SchemaTypes.String, required: true, unique: true }, // Hong Kong ID Card number
    password: { type: SchemaTypes.String, required: true }, // password
    status: { type: SchemaTypes.Boolean, default: true }, // status, default: true
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
