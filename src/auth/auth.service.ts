import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Shop } from "../shop/shop.entity";

@Injectable()
export class AuthService {
  constructor(readonly jwtService: JwtService) {
    return this;
  }

  generateToken(shop: Shop): string {
    return this.jwtService.sign({ sub: shop.id });
  }
}
