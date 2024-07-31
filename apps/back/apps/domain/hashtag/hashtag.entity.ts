import { Column, Entity, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { ProductHashtag } from "apps/domain/product/product-hashtag.entity";

@Entity()
export class Hashtag extends DefaultEntity {
  @Column({ comment: "해시태그명" })
  name: string;

  @OneToMany(() => ProductHashtag, (productHashtag) => productHashtag.hashtag)
  productHashtags: ProductHashtag[];
}
