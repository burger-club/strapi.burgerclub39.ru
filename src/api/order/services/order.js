'use strict';

/**
 * order service.
 */

const {createCoreService} = require('@strapi/strapi').factories;
const axios = require('axios')

module.exports = createCoreService('api::order.order', () => ({
  telegramAPI: axios.create({
    baseURL: 'https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN
  }),

  async create(params) {
    const result = await super.create({ ...params, populate: ['city', 'items', 'items.product'] });

    await this.telegramAPI.post('/sendMessage', {
      chat_id: result.city.telegramChatId,
      parse_mode: 'markdown',
      text: `💡 *${result.city.name}* | Новый заказ!

*Имя:* ${result.name}
*Номер телефона:* ${result.phone}
*Адрес:* ${result.address}

*Список товаров:*\n${result.items.map((item, i) => `${i + 1}. *${item.product.name}* x *${item.amount}* (${item.product.price * item.amount} ₽)`).join('\n')}

Итого: *${result.items.reduce((acc, item) => acc + item.product.price * item.amount, 0)} ₽*`
    })

    return result;
  }
}));
