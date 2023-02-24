import * as metaAPI from './../apis/meta.api.js';

export const firstHello = async (recipientNo) => {
  await metaAPI.sendMenu(recipientNo, 'first_hello');
};