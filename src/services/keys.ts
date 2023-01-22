export const pageCacheKey = (id: string) => `pc#${id}`;

export const userKey = (id: string) => `u#${id}`;

export const sessionKey = (id: string) => `s#${id}`;

export const itemKey = (id: string) => `i#${id}`;

// h hash set to store all usernames
export const usernamesUniqueKey = () => 'usernames:unique';
