import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

/**
 * 메인페이지 광고판 역할
 *
 * - 어드민이 직접 백오피스에서 작성
 */
@Entity()
export class RecentRaffle extends DefaultEntity {
  @Column({ comment: "제목" })
  title: string;

  @Column({ comment: "부제목" })
  subTitle: string;

  @Column({ comment: "이미지 URL" })
  imageUrl: string;
}
