import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => context.switchToHttp().getRequest().user,
);

export const CurrentAdmin = createParamDecorator(
  (_, context: ExecutionContext) => context.switchToHttp().getRequest().user,
);
