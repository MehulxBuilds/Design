export interface KeyDel { id: string; }
export interface KeyBlock { id: string; }
export interface AccessKeyRecord { id: string; key: string; block: boolean; createdAt: Date; updatedAt: Date; }
export interface KeyDelRes { success: boolean; message: string; }
export interface KeyBlockRes { success: boolean; message: string; key?: AccessKeyRecord; }
export interface KeyAllRes { success: boolean; message: string; keys: AccessKeyRecord[]; }
export type KeyAll = KeyAllRes;
export interface KeyGenRes { success: boolean; message: string; key?: AccessKeyRecord; }
export type KeyGen = KeyGenRes;
export interface KeyMeRes { success: boolean; message: string; key?: AccessKeyRecord }
export interface KeyMe { key: String }