import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import {
  ActivityCreateModel,
  ActivityUpdateModel,
  ActivitySearchModel,
  ActivityVoteModel,
} from './models';
import { IActivity } from './interfaces';

import { VoteLogService } from '../VoteLog/voteLog.service';
import { MailService } from '../Mail/mail.service';

import { CurrentUser } from '../../core/decorators';
import { ActivityStatus } from '../../core/enum';

@Injectable()
export class ActivityService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel('Activitys')
    private readonly activityRepository: Model<IActivity>,
    private readonly voteLogService: VoteLogService,
    private readonly mailservice: MailService,
  ) {}

  public _castQuery(searchModel: ActivitySearchModel) {
    const query: any = {};
    const {} = searchModel;
    return query;
  }

  /**
   * 创建选举活动
   * @param body
   * @returns
   */
  public async create(body: ActivityCreateModel) {
    if (new Set(body.candidates).size < 2) {
      throw new Error('候选人最少要两位');
    }
    return this.activityRepository.create(body);
  }

  /**
   * 添加候选人
   * @param _id 选举活动 id
   * @param names 需要添加的候选人列表
   * @returns
   */
  public async addCandidates(_id, names) {
    const activity = await this.activityRepository.findOne({
      _id: _id,
      status: { $nin: [ActivityStatus.ENDED] },
    });
    if (activity) {
      activity.candidates = [...activity.candidates, ...names];
      await activity.save();
    }
  }

  /**
   * 查询所有选举活动
   * @param query
   * @returns
   */
  public async find(searchQuery: ActivitySearchModel) {
    const query = this._castQuery(searchQuery);
    const results = await this.activityRepository
      .find(query)
      .skip(((searchQuery.page || 1) - 1) * (searchQuery.limit || 10))
      .limit(searchQuery.limit || 10)
      .exec();

    const total = await this.activityRepository.find(query).count();
    return {
      docs: results,
      limit: searchQuery.limit || 10,
      currentPage: searchQuery.page || 1,
      totalPages: Math.ceil(total / (searchQuery.limit || 10)),
      totalDocs: total,
    };
  }

  public async findById(id) {
    return this.activityRepository.findById(id);
  }

  public async update(_id, newBody: ActivityUpdateModel) {
    return this.activityRepository.findByIdAndUpdate(_id, newBody, {
      new: true,
    });
  }

  /**
   * 更改选举活动的状态
   * @param status ActivityStatus (UNSTART: 未开始, PROCESSING: 进行中,ENDED: 已结束)
   * @returns
   */
  public async updateStatus(_id: string, status: ActivityStatus) {
    try {
      const activity = await this.activityRepository.findByIdAndUpdate(
        _id,
        {
          $set: {
            status: status,
          },
        },
        { new: true },
      );
      // 如果活动状态更新成功为结束，则推送邮件给对应的会员
      if (activity.status === ActivityStatus.ENDED) {
        const voteLog = await this.getVoting(_id);
        for (const c of voteLog.candidates) {
          const members: any = await this.voteLogService.find({
            activityId: activity._id.toString(),
            candidateId: c.candidateId.toString(),
            isPagination: false,
          });
          const emails = members.map(m => m.memberId.email);
          const context = {
            candidateName: c.candidateName,
            votes: c.votes,
            percent: c.percent,
            totalVotes: voteLog.totalVotes,
          };
          await this.mailservice.sendVotingResultToMember(emails, context);
        }
      }
    } catch (err) {
      throw new HttpException(
        {
          stauts: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '发生了些错误',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 投票 并返回所有候选人的得票情况
   * @param voteBody
   */
  public async vote(voteBody: ActivityVoteModel, @CurrentUser() currentUser) {
    const activity = await this.activityRepository
      .findOne({
        _id: voteBody.activityId,
        status: ActivityStatus.PROCESSING,
      })
      .lean();
    if (!activity) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '选举活动并非进行中,无法投票',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 先检查是否已在本次投票活动中已经进行过投票
    const log = await this.voteLogService.findOneByMemberId({
      activityId: voteBody.activityId,
      candidateId: voteBody.candidateId,
      memberId: currentUser._id,
    });
    if (log) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '本次选举中，你已进行过了投票',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // 进行投票
    await this.voteLogService.create({
      activityId: voteBody.activityId,
      candidateId: voteBody.candidateId,
      memberId: currentUser._id,
    });
    return this.getVoting(voteBody.activityId);
  }

  /**
   * 查询得票情况
   * @param activityId
   * @returns
   */
  public async getVoting(activityId, candidateId = null) {
    const activity = await this.activityRepository
      .findOne({
        _id: activityId,
      })
      .lean();

    const voteLog = await this.voteLogService.groupByActivity(activityId);
    // 计算本次选举所有票数
    let totalVotes = 0;
    voteLog.map(v => (totalVotes += v.count));

    const result = [];
    activity.candidates.map(c => {
      voteLog.map(v => {
        if (candidateId) {
          if (
            v._id.candidateId.toString() === c._id.toString() &&
            c._id.toString() === candidateId
          ) {
            result.push({
              candidateId: c._id,
              candidateName: c.name, // 候选人名字
              votes: v.count, // 获取票数
              percent: `${Math.round((v.count / totalVotes) * 10000) / 100.0}%`, // 百分比
            });
          }
        } else {
          if (v._id.candidateId.toString() === c._id.toString()) {
            result.push({
              candidateId: c._id,
              candidateName: c.name, // 候选人名字
              votes: v.count, // 获取票数
              percent: `${Math.round((v.count / totalVotes) * 10000) / 100.0}%`, // 百分比
            });
          }
        }
      });
    });
    return {
      _id: activity._id, // 选举活动id
      name: activity.name, // 选举活动名称
      candidates: result,
      totalVotes: totalVotes, // 本场活动总票数
    };
  }
}
