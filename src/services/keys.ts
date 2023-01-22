export const pageCacheKey = (id: string) => `pc#${id}`;

export const userKey = (id: string) => `u#${id}`;

export const sessionKey = (id: string) => `s#${id}`;

// h hash set to store all usernames
export const usernamesUniqueKey = () => 'usernames:unique';

export const userLikesKey = (id: string) => `u:l#${id}`;

export const usernamesKey = () => 'usernames';

// items related keys
export const itemKey = (id: string) => `i#${id}`;
export const itemByViewKey = () => 'item:views';
