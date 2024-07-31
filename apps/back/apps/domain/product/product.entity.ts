import { Column, Entity, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { ProductHashtag } from "apps/domain/product/product-hashtag.entity";

@Entity()
export class Product extends DefaultEntity {
  @Column({ comment: "상품명" })
  title: string;

  @Column({ comment: "상품 설명", nullable: true })
  description?: string;

  @Column({ comment: "이미지 URL" })
  imageUrl: string;

  @OneToMany(() => ProductHashtag, (productHashtag) => productHashtag.product)
  productHashtags: ProductHashtag[];
}
