import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dad6777f49124b",
        pass: "92cbc0e1950136",
      },
    });

    const verifyEmailHtml = `
      <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the following link into your browser:<br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>
    `;

    const resetPasswordHtml = `
      <p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the following link into your browser:<br>
      ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
      </p>
    `;

    const mailOptions = {
      from: "bar@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify YOUR Email" : "Reset YOUR Password",
      html: emailType === "VERIFY" ? verifyEmailHtml : resetPasswordHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
