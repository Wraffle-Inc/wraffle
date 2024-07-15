import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleStrategy {
  async authorizeRole(
    context: ExecutionContext,
    requiredRoles?: string[],
    isPublic?: boolean,
  ): Promise<boolean> {
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user && isPublic) {
      return true;
    }

    const isAuthorized = requiredRoles.some((role) => user.role === role);

    if (isAuthorized) {
      return true;
    }

    return false;
  }
}
