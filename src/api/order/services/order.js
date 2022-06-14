'use strict';

/**
 * order service.
 */

const {createCoreService} = require('@strapi/strapi').factories;
const axios = require('axios')
const telegramAPI = axios.create({
  baseURL: 'https://api.telegram.org/bot5394792237:AAHBA8O6wYP7rDw6xPiJxyvNx9obH9BCRK8'
})

const notifyTelegram = (text) => {
  return telegramAPI.post('/sendMessage', {
    chat_id: "-1001660106652",
    text
  })
}

module.exports = createCoreService('api::order.order', () => ({
  async create(params) {
    const result = await super.create({ ...params, populate: ['items', 'items.product'] });
    await notifyTelegram('HUI')
    return result;
  }
}));
