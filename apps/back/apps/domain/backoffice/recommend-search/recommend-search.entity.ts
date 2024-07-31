import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

@Entity()
export class RecommendSearch extends DefaultEntity {
  @Column({ comment: "순위" })
  index: number;

  @Column({ comment: "검색어" })
  keyword: string;
}
