/* eslint-disable @typescript-eslint/camelcase */
import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import axios from "axios";

import { ShopService } from "../shop/shop.service";
import { AuthService } from "./auth.service";
import { Token } from "./object/token.object";

@Resolver("Auth")
export class AuthResolver {
  public constructor(
    readonly authService: AuthService,
    readonly shopService: ShopService
  ) {
    return this;
  }

  @Mutation(() => Token)
  public async getToken(
    @Args("code") code: string,
    @Args("myshopifyDomain") myshopifyDomain: string
  ): Promise<Token> {
    let accessToken = "";
    let email = "";

    try {
      const response = await axios.post(
        `https://${myshopifyDomain}/admin/oauth/access_token`,
        {
          client_id: process.env.SHOPIFY_API_KEY,
          client_secret: process.env.SHOPIFY_API_SECRET,
          code
        }
      );

      accessToken = response.data.access_token;
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    let shop = await this.shopService.findOne({
      where: { myshopifyDomain }
    });

    if (!shop) {
      const shopInfo = (
        await axios.get(
          `https://${myshopifyDomain}/admin/api/2020-04/shop.json`,
          {
            headers: { "X-Shopify-Access-Token": accessToken }
          }
        )
      ).data;

      email = shopInfo.shop.email;

      shop = this.shopService.create({
        myshopifyDomain,
        accessToken,
        email
      });

      this.shopService.save(shop);
    } else {
      shop.accessToken = accessToken;
      this.shopService.save(shop);
    }

    const token = this.authService.generateToken(shop);

    return { token };
  }

  @Query(() => String)
  say(): string {
    return "HelloWorld";
  }
}
