// Sessions
export const sessionKey = (id) => `s#${id}`;

// Cache
export const pageCacheKey = (id) => `pc#${id}`;

// Users
export const usersKey = (userId) => (id) => `u#${id}`;
export const usernamesKey = () => 'usernames';
export const usernamesUniqueKey = () => 'usernames:unique';
export const usersItemsKey = (userId) => `users:items#${userId}`;
export const usersBidsKey = (userId) => `users:bids#${userId}`;
export const usersLikesKey = (id) => `u:l#${id}`;

// Items
export const itemsKey = (id) => `i#${id}`;
export const bidHistoryKey = (id) => `i:b#${id}`;
export const itemsByBidsKey = () => 'items:bids';
export const itemsByViewsKey = () => 'item:views';
export const itemsByPriceKey = () => 'item:price';
export const itemsByEndingAtKey = () => 'item:endingAt';
export const itemsViewsKey = (id) => `i:v#${id}`;
export const itemsIndexKey = () => 'idx:i';
