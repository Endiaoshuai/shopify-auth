import { createParamDecorator } from "@nestjs/common";

import { Shop } from "./shop.entity";

export const CurrentShop = createParamDecorator((data, [, , ctx]) => {
  return ctx.req.user instanceof Shop ? ctx.req.user : null;
});
