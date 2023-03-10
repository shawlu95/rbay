export const pageCacheKey = (id: string) => `pc#${id}`;

export const userKey = (id: string) => `u#${id}`;
export const sessionKey = (id: string) => `s#${id}`;
export const usernamesUniqueKey = () => 'usernames:unique'; // hash set
export const usernamesKey = () => 'usernames'; // sorted set

// items related keys
export const itemKey = (id: string) => `i#${id}`;
export const itemByViewKey = () => 'item:views'; // sorted set
export const itemByEndingAtKey = () => 'item:endingAt'; // sorted set
export const itemBidKey = (id: string) => `i:b#${id}`; // list
export const itemByPriceKey = () => 'item:price'; // sorted set
export const itemIndexKey = () => 'idx:i'; // index key

// relation
export const userLikesKey = (id: string) => `u:l#${id}`;
export const itemViewsKey = (id: string) => `i:v#${id}`;
