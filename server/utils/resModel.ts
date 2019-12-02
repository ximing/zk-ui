export class ResError {
  code: number;
  data: any;
  error: any;

  constructor(code, type, message) {
    this.code = code;
    this.error = {
      type,
      message
    };
  }
}
//配置异常类型
var code2type = [
  { code: 400, type: "Bad Request" },
  { code: 401, type: "PermissionDenied" },
  { code: 404, type: "Not Found" },
  { code: 411, type: "PermissionDenied" },
  { code: 412, type: "Need Login" },
  { code: 500, type: "Server Error" },
  { code: 506, type: "File Conflict" },
  { code: 507, type: "Group Name Conflict" }
];
export const getTypeByCode = function(code) {
  for (var index in code2type) {
    if (code2type[index].code === code) {
      return code2type[index].type;
    }
  }
};

export const unauthorized = function(msg) {
  return new ResError(401, "PermissionDenied", msg || "没有足够的权限");
};
export const tokenOutTime = function(msg) {
  return new ResError(411, "PermissionDenied", msg || "token失效");
};
export const badRequest = function(msg) {
  return new ResError(400, "Bad Request", msg || "请求参数有误");
};
export const notFound = function(msg) {
  return new ResError(404, "Not Found", msg || "资源不存在");
};
export const serverError = function(msg) {
  return new ResError(500, "Server Error", msg || "服务器错误");
};
export const fileExit = function(msg) {
  return new ResError(506, "File Conflict", msg || "文件已存在，出现冲突");
};
export const berforeUpdate = function(msg) {
  return new ResError(506, "File Conflict", msg || "文件已提前更改，出现冲突");
};
export const groupExit = function(msg) {
  return new ResError(
    507,
    "Group Name Conflict",
    msg || "组名已存在，出现冲突"
  );
};
export const success = function(data) {
  return {
    code: 0,
    data
  };
};
