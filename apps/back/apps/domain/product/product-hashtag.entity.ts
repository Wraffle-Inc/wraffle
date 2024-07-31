import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { Product } from "apps/domain/product/product.entity";
import { Hashtag } from "apps/domain/hashtag/hashtag.entity";

@Entity()
export class ProductHashtag extends DefaultEntity {
  @Column({ comment: "상품 ID" })
  productId: number;

  @Column({ comment: "해시태그 ID" })
  hashtagId: number;

  @ManyToOne(() => Product, (product) => product.productHashtags)
  product: Product;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.productHashtags)
  hashtag: Hashtag;
}
