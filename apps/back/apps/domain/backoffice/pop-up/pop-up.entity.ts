import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

@Entity()
export class PopUp extends DefaultEntity {
  @Column({ comment: "팝업 제목" })
  title: string;

  @Column({ comment: "팝업 이미지" })
  imageUrl: string;

  @Column({ comment: "팝업 링크" })
  toGoUrl: string;
}
