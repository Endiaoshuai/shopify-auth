import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { CreateShopInput } from "../shop/input/create-shop.input";
import { Shop } from "./shop.entity";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>
  ) {
    return this;
  }

  async findOne(option: FindOneOptions): Promise<Shop> {
    return this.shopRepository.findOne(option);
  }

  create(input: CreateShopInput): Shop {
    const shop = this.shopRepository.create(input);
    return shop;
  }

  async save(shop: Shop): Promise<Shop> {
    return this.shopRepository.save(shop);
  }
}
