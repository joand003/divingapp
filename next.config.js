/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    env: {
        SENDGRID_API_URL:  'https://api.sendgrid.com/v3/mail/send',
        SENDGRID_API_KEY: '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',
        MONGODB_URI: 'mongodb+srv://joshuaandersland:SMEdwKPr7PJK5TsF@cluster0.nfvee8q.mongodb.net/diving?retryWrites=true&w=majority',
        JWT_SECRET: 'TheAirSpeedVelocityOfAnUnladenSwallowIs?8201982'
      }
}

module.exports = nextConfig