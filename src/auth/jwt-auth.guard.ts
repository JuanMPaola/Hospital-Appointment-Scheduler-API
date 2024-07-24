import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { SKIP_AUTH_KEY } from './skip-auth.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector, // Is used to access @SkipAuth
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.get<boolean>(SKIP_AUTH_KEY, context.getHandler());
    if (skipAuth) {
      return true; // Skip authentication for routes with @SkipAuth
    }

    // Get the request and extract the token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    // Use authService to verify token
    try {
      const decoded = await this.authService.verifyToken(token);
      (request as any).user = decoded; // Attach the decoded user to the request
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');
    return bearer === 'Bearer' ? token : null;
  }
}