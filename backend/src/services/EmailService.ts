import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  private transporter: any;

  private async init() {
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials missing in .env. Email service may not work.');
      }

      const port = Number(process.env.SMTP_PORT) || 587;

      // create reusable transporter object using the default SMTP transport
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false // Fix for some shared hosting SMTPs
        }
      });

      console.log('Email Service Initialized with Real SMTP');
    } catch (error) {
      console.error('Failed to initialize Email Service:', error);
    }
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    if (!this.transporter) await this.init();
    if (!this.transporter) return;

    try {
      const info = await this.transporter.sendMail({
        from: `"Phoenix Imperial" <${process.env.SMTP_USER}>`, // Ensure From matches Auth User
        to: to, // list of receivers
        subject: "Password Reset Request", // Subject line
        text: `You requested a password reset. Click here to reset your password: ${resetLink}`, // plain text body
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #d97706;">Password Reset Request</h2>
              <p>You requested a password reset for your Phoenix Imperial account.</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}" style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
              </div>
              <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
              <p style="color: #6b7280; font-size: 14px;">This link will expire in 1 hour.</p>
            </div>
          `, // html body
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendBookingConfirmationEmail(to: string, bookingDetails: any) {
    if (!this.transporter) await this.init();
    if (!this.transporter) return;

    try {
      await this.transporter.sendMail({
        from: `"Phoenix Imperial" <${process.env.SMTP_USER}>`,
        to: to,
        subject: "Booking Confirmed - Phoenix Imperial",
        html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #18181b; padding: 30px; text-align: center;">
                <h1 style="color: #d97706; margin: 0; font-family: 'Georgia', serif; font-size: 28px;">Phoenix Imperial</h1>
                <p style="color: #a1a1aa; margin-top: 5px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Luxury Redefined</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #18181b; margin-top: 0; font-size: 24px;">Booking Confirmed</h2>
                <p style="color: #52525b; line-height: 1.6;">Dear Guest,</p>
                <p style="color: #52525b; line-height: 1.6;">Thank you for choosing Phoenix Imperial. We are delighted to confirm your reservation. Your payment has been received, and your room is ready for your arrival.</p>
                
                <div style="background-color: #f4f4f5; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <h3 style="color: #18181b; margin-top: 0; border-bottom: 1px solid #d4d4d8; padding-bottom: 10px; margin-bottom: 20px;">Reservation Details</h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Booking Reference</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">#${bookingDetails.id.slice(-8)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Check-in</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.checkIn}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Check-out</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.checkOut}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Room Type</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.roomName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Total Amount</td>
                      <td style="padding: 8px 0; color: #d97706; font-weight: bold; text-align: right; font-size: 18px;">₦${bookingDetails.totalPrice.toLocaleString()}</td>
                    </tr>
                  </table>
                </div>

                <p style="color: #52525b; line-height: 1.6;">We look forward to providing you with an exceptional experience.</p>
                
                <div style="text-align: center; margin-top: 40px;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="background-color: #18181b; color: #d97706; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Booking</a>
                </div>
              </div>
              
              <div style="background-color: #f4f4f5; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa;">
                <p>&copy; ${new Date().getFullYear()} Phoenix Imperial Hotels. All rights reserved.</p>
              </div>
            </div>
          `,
      });
      console.log(`Confirmation email sent to ${to}`);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }

  async sendBookingReceivedEmail(to: string, bookingDetails: any) {
    if (!this.transporter) await this.init();
    if (!this.transporter) return;

    try {
      await this.transporter.sendMail({
        from: `"Phoenix Imperial" <${process.env.SMTP_USER}>`,
        to: to,
        subject: "Booking Request Received - Phoenix Imperial",
        html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #18181b; padding: 30px; text-align: center;">
                <h1 style="color: #d97706; margin: 0; font-family: 'Georgia', serif; font-size: 28px;">Phoenix Imperial</h1>
                <p style="color: #a1a1aa; margin-top: 5px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Luxury Redefined</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #18181b; margin-top: 0; font-size: 24px;">Request Received</h2>
                <p style="color: #52525b; line-height: 1.6;">Dear Guest,</p>
                <p style="color: #52525b; line-height: 1.6;">We have received your booking request for a stay at Phoenix Imperial. Since you have chosen to <strong>Pay at Hotel</strong>, your reservation is currently <strong>Pending</strong>.</p>
                <p style="color: #52525b; line-height: 1.6;">Our team will review your request shortly. You will receive a confirmation email once your booking is confirmed.</p>
                
                <div style="background-color: #f4f4f5; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <h3 style="color: #18181b; margin-top: 0; border-bottom: 1px solid #d4d4d8; padding-bottom: 10px; margin-bottom: 20px;">Request Details</h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Booking Reference</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">#${bookingDetails.id.slice(-8)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Check-in</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.checkIn}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Check-out</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.checkOut}</td>
                    </tr>
                     <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Room Type</td>
                      <td style="padding: 8px 0; color: #18181b; font-weight: bold; text-align: right;">${bookingDetails.roomName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Amount Due</td>
                      <td style="padding: 8px 0; color: #d97706; font-weight: bold; text-align: right; font-size: 18px;">₦${bookingDetails.totalPrice.toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
                
                <div style="text-align: center; margin-top: 40px;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="background-color: #18181b; color: #d97706; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Status</a>
                </div>
              </div>
              
              <div style="background-color: #f4f4f5; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa;">
                <p>&copy; ${new Date().getFullYear()} Phoenix Imperial Hotels. All rights reserved.</p>
              </div>
            </div>
          `,
      });
      console.log(`Request received email sent to ${to}`);
    } catch (error) {
      console.error('Error sending request received email:', error);
    }
  }
}

export const emailService = new EmailService();
