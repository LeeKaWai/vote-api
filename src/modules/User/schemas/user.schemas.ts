import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'Users';
export const Schema = new MongooseSchema(
  {
    email: { type: SchemaTypes.String, required: true, unique: true },
    status: { type: SchemaTypes.Boolean, default: true },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
