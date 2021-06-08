import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'VoteLogs';
export const Schema = new MongooseSchema(
  {
    memberId: {
      type: SchemaTypes.ObjectId,
      ref: 'Members',
      required: true,
    },
    activityId: {
      type: SchemaTypes.ObjectId,
      ref: 'Activity',
      required: true,
    },
    candidateId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
