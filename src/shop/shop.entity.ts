import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Shop {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "bigint" })
  public id: string;

  @Field()
  @Column()
  public myshopifyDomain: string;

  @Field()
  @Column()
  public email: string;

  @Column()
  public accessToken: string;

  @Field()
  @CreateDateColumn()
  public createAt: Date;

  @Field()
  @UpdateDateColumn()
  public updateAt: Date;
}
