import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Event } from "apps/domain/event/event.entity";
import { Product } from "apps/domain/product/product.entity";

@Entity()
export class EventProduct extends DefaultEntity {
  @Column({ comment: "이벤트 ID" })
  eventId: number;

  @Column({ comment: "상품 ID" })
  productId: number;

  @ManyToOne(() => Event, (event) => event.eventProducts)
  event: Event;

  @ManyToOne(() => Product, (product) => product.eventProducts)
  product: Product;
}
