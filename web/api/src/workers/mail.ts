

import nodemailer from 'nodemailer';

require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

export const sendCopyMail = async (id: string, event: boolean, mail: string, qrId: string) => {
  const preview = `/preview/${id}`
  try {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: mail,
        subject: `SOSC: You have registered ${event? 'events': 'hackathon'} successfully`,
        envelope: {
            from: `SOSC ${process.env.EMAIL}`,
            to: `${mail}`
        },
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css">
          </head>
          <body>
            <section class="mx-auto max-w-2xl bg-white px-6 py-8">
              <header>
                <a href="https://www.sosc.org.in/">
                  <img class="h-7 w-auto sm:h-8" src="https://www.sosc.org.in/static/cc29da5173348add81ab2ba5a58c9471/6ef15/logo_grad.webp" alt="" />
                </a>
              </header>
            
              <main class="mt-8">
                <div class="flex items-center justify-center">
                  <img class="w-50 items-center justify-center rounded-lg md:w-72" src="https://qr.heimanbotz.workers.dev/download/${qrId}" alt="QR Code" />
                </div>
            
                <h2 class="mt-6 text-gray-700">Hi attendee,</h2>
            
                <p class="mt-2 leading-loose text-gray-600">We’re glad to have you ${!event? 'team': ''} onboard! Lets share an enriching experience together. Thank you for being a part of our ${event? 'event': 'hackathon'}.</p>

                <p class="mt-2 text-gray-600">
                  Thank you, <br />
                  SOSC team
                </p>
            
                <a href="${preview}">
                  <button class="mt-8 transform rounded-lg bg-green-600 px-6 py-2 text-sm font-medium capitalize tracking-wider text-white transition-colors duration-300 hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-80">Preview</button>
                </a>
              </main>
            
              <footer class="mt-8">
                <p class="text-gray-500">This email was sent to <a href="mailto:${mail}" class="text-green-600 hover:underline" target="_blank">${mail}</a>. If you have any questions or require further information, please don't hesitate to contact us at <a href="mailto:${process.env.EMAIL}" class="text-green-600 hover:underline">${process.env.EMAIL}</a> .</p>
            
                <p class="mt-3 flex items-center justify-center text-gray-500">© 2023 SOSC. All Rights Reserved.</p>
              </footer>
            </section>
          </body>
          </html>
        `,
      }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return { success: false, message: `Error: ${error}` }
        } else {
            return { success: true, message: info.response }
        }
    });
  } catch (e) {
    return { success: false, message: `Error: ${e.message}` }
  }
}

export const sendVerifyMail = async (mail: string, event: string) => {
  const feedback = `/feedback/devhost`
  try {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: mail,
        subject: `SOSC: Your Attendance at ${event} Verified`,
        envelope: {
            from: `SOSC ${process.env.EMAIL}`,
            to: `${mail}`
        },
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css">
          </head>
          <body>
            <section class="mx-auto max-w-2xl bg-white px-6 py-8">
              <header>
                <a href="https://www.sosc.org.in/">
                  <img class="h-7 w-auto sm:h-8" src="https://www.sosc.org.in/static/cc29da5173348add81ab2ba5a58c9471/6ef15/logo_grad.webp" alt="" />
                </a>
              </header>
            
              <main class="mt-8">
                <div class="flex items-center justify-center">
                  <img class="w-50 items-center justify-center rounded-lg md:w-72" src="https://qr.heimanbotz.workers.dev/download/BQACAgQAAx0EW5V7wQADImUigVfuZGv6Qy0nTwluw4VutXzpAAKGBAAC8YH8UCl1MxZ4erkGMAQ" alt="" />
                </div>
            
                <h2 class="mt-6 text-gray-700">Hi attendee,</h2>
            
                <p class="mt-2 leading-loose text-gray-600">We’re glad to have you here! After the event please provide us with your valuable feedback related to ${event}. Thank you for attending this session and spend your valuable time with us.</p>

                <p class="mt-2 text-gray-600">
                  Thanks, <br />
                  SOSC team
                </p>
            
                <a href="${feedback}">
                  <button class="mt-8 transform rounded-lg bg-green-600 px-6 py-2 text-sm font-medium capitalize tracking-wider text-white transition-colors duration-300 hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-80">Feeback</button>
                </a>
              </main>
            
              <footer class="mt-8">
                <p class="text-gray-500">This email was sent to <a href="mailto:${mail}" class="text-green-600 hover:underline" target="_blank">${mail}</a>. If you have any questions or require further information, please don't hesitate to contact us at <a href="mailto:${process.env.EMAIL}" class="text-green-600 hover:underline">${process.env.EMAIL}</a> .</p>
            
                <p class="mt-3 flex items-center justify-center text-gray-500">© {{ new Date().getFullYear() }} SOSC. All Rights Reserved.</p>
              </footer>
            </section>
          </body>
          </html>
        `,
      }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return { success: false, message: `Error: ${error}` }
        } else {
            return { success: true, message: info.response }
        }
    });
  } catch (e) {
    return { success: false, message: `Error: ${e.message}` }
  }
}

