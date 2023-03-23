import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PROVIDER_ENUM } from "src/common/interfaces/provider";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column({ type: "enum", enum: PROVIDER_ENUM, default: "credentials" })
  @Field(() => String)
  provider: string;

  @Column({ nullable: true })
  @Field(() => Int)
  age: number;

  @Column({ nullable: true })
  @Field(() => String)
  interest: string;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  reported: number;

  @Column({ nullable: true })
  @Field(() => String)
  image: string;

  // =====================

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
