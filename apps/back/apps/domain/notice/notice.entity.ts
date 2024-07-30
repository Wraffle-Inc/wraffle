import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

@Entity()
export class Notice extends DefaultEntity {
  @Column({ comment: "공지사항 제목" })
  title: string;

  @Column({ comment: "공지 내용" })
  content: string;
}
