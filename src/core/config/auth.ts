export default {
    jwt: {
        secret: process.env.APP_SECRET || 'e35a086d5514233a5125640855d81739',
        expiresIn: '1d',
    },
};
