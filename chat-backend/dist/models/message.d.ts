import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    message: string;
    createdate: NativeDate;
    senderId: string;
    roomId: string;
    username?: string | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=message.d.ts.map