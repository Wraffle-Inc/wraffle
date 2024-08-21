import { ExecutionContext } from "@nestjs/common";

export const IRoleStrategyName = "IRoleStrategy";
export interface IRoleStrategy {
  authorizeRole(
    context: ExecutionContext,
    requiredRoles?: string[],
    isPublic?: boolean,
  ): Promise<boolean>;
}
