import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVotingResultToMember(emails: [string], context: any) {
    for (let i = 0; i < emails.length; i++) {
      await this.mailerService.sendMail({
        to: emails[i],
        subject: '您参与的投票已得出结果',
        template: __dirname + '/templates/notice',
        context: {
          ...context,
          email: emails[i],
        },
      });
    }
  }
}
