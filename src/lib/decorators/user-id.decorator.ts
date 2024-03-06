import { createAuthParamDecorator } from "../functions/create-auth-param-decorator.function";

export const UserId = createAuthParamDecorator<{ userId: boolean }>(token => token && token.userId);
