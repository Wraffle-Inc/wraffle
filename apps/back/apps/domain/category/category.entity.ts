import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { Raffle } from "apps/domain/raffle/raffle.entity";
import { Event } from "apps/domain/event/event.entity";

@Entity()
export class Category extends DefaultEntity {
  @Column({ comment: "카테고리 이름" })
  name: string;

  @Column({ comment: "카테고리 단계(1차,2차)" })
  depth: number;

  @Column({ comment: "카테고리 이미지", nullable: true })
  image?: string;

  @Column({ comment: "상위 카테고리 ID", nullable: true })
  parentId?: number;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subCategories?: Category[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn({ name: "parent_id", referencedColumnName: "id" })
  parentCategory?: Category;

  @OneToMany(() => Raffle, (raffle) => raffle.category)
  raffles: Raffle[];

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
