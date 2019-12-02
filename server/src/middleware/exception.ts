/**
 * Created by ximing on 2018/5/30.
 */
"use strict";
import { ResError, getTypeByCode } from "../utils/resModel";

export default () => {
  return async function exception(ctx, next) {
    try {
      // 匹配路由
      await next();
    } catch (err) {
      console.error(err);
      ctx.response.set("content-type", "application/json;charset=utf-8");
      if (err instanceof ResError) {
        ctx.body = err;
        return;
      }
      const errorCode = err.status || 500;
      console.log("erro doe", errorCode);
      const errorType = getTypeByCode(errorCode);
      const errorMsg = err.message;
      ctx.body = new ResError(errorCode, errorType, errorMsg);
    }
  };
};
