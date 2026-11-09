import nodemailer from 'nodemailer';
import env from '../config/environment.js';

const mailer = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: env.MAIL_SCHEME === 'smtps',
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
});

export default mailer;
