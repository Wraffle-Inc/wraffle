import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

@Entity()
export class SignInHistory extends DefaultEntity {
  @Column({ comment: "로그인한 유저 ID" })
  userId: number;

  @Column({ comment: "로그인한 IP" })
  ip: string;
}
