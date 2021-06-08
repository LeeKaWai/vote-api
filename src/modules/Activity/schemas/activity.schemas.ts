import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

// 选举活动表
export const CollectionName = 'Activitys';
export const Schema = new MongooseSchema(
  {
    // 活动名称
    name: { type: SchemaTypes.String, required: true, unique: true },
    // 获选人, 一场选举最少2名候选人才可以更新活动
    candidates: [
      {
        name: { type: SchemaTypes.String, required: true },
      },
    ],
    // 活动开始时间
    startTime: { type: SchemaTypes.Date, required: true },
    // 活动结束时间，默认活动结束时间不能早于开始时间,最少为1分钟
    endTime: { type: SchemaTypes.Date, required: true },
    // 活动状态 默认关闭
    status: { type: SchemaTypes.Boolean, default: false },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
