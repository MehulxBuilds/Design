export interface DesignGen { title: string; description?: string; image: Uint8Array; }
export interface DesignDel { id: string; }
export interface DesignUpd { id: string; title: string; description?: string; buffer?: Uint8Array; key: string; }
export interface DesignRecord { id: string; key: string; url: string; title: string; description: string | null; provider: "UPLOADTHINGS" | "CFR2" | "AWSS3"; createdAt: Date; updatedAt: Date; }
export interface DesignAllRes { success: boolean; message: string; design: DesignRecord[]; }
export type DesignallRes = DesignAllRes;
export interface DesignUpdRes { success: boolean; message: string; design?: DesignRecord; }
export interface DesignDelRes { success: boolean; message: string; }
export interface DesignGenRes { success: boolean; message: string; design?: DesignRecord; }
