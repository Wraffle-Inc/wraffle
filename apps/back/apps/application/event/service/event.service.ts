import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "apps/domain/event/event.entity";
import { CreateEventDto } from "apps/application/event/dto/request/create-event.dto";
import {
  CustomResponse,
  IResponse,
} from "apps/application/common/response/response";
import { CreateEventResultDto } from "apps/application/event/dto/response/create-event-result.dto";
import { plainToInstance } from "class-transformer";
import { Product } from "apps/domain/product/product.entity";
import { EventProduct } from "apps/domain/event/event-product.entity";
import { EventHashtag } from "apps/domain/event/event-hashtag.entity";
import { Hashtag } from "apps/domain/hashtag/hashtag.entity";
import { Transactional } from "typeorm-transactional";
import { Images } from "apps/domain/image/image.entity";
import { RaffleType } from "apps/domain/common/enum/raffle.enum";
import { ProductHashtag } from "apps/domain/product/product-hashtag.entity";
import { GetEventDto } from "apps/application/event/dto/response/get-event.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
    @InjectRepository(ProductHashtag)
    private readonly productHashtagRepository: Repository<ProductHashtag>,
    @InjectRepository(EventProduct)
    private readonly eventProductRepository: Repository<EventProduct>,
    @InjectRepository(EventHashtag)
    private readonly eventHashtagRepository: Repository<EventHashtag>,
  ) {}

  @Transactional()
  async createEvent(
    dto: CreateEventDto,
  ): Promise<IResponse<CreateEventResultDto>> {
    // 이벤트 생성
    // TODO: SignUp API 추가 되면 테스트 후 @CurrentUser()로 사용자 정보 가져와서 createUserId에 넣어주기
    const event = this.eventRepository.create({
      ...dto,
      thumbnail: dto.images[0],
      createUserId: 2,
    });

    await this.eventRepository.save(event);

    // 이벤트 상품 생성 및 매핑
    const products = await this.productRepository.save(
      dto.products.map((product) => this.productRepository.create(product)),
    );

    // 상품 및 이벤트 이미지 매핑
    const images = [
      // 상품 이미지 매핑
      ...products.map((product) => ({
        url: product.imageUrl,
        type: RaffleType.PRODUCT,
        targetId: product.id,
      })),
      // 이벤트 이미지 매핑
      ...dto.images.map((image) => ({
        url: image,
        type: RaffleType.EVENT,
        targetId: event.id,
      })),
    ];
    await this.imagesRepository.save(images);

    // 상품-해시태그 테이블에 매핑
    const productHashtags = dto.products.map((product, index) => ({
      productId: products[index].id,
      hashtagId: product.tagIds[index],
      product: products[index],
      hashtag: { id: product.tagIds[index] } as Hashtag,
    }));
    await this.productHashtagRepository.save(productHashtags);

    // 이벤트-상품 테이블에 매핑
    const eventProducts = products.map((product) => ({
      eventId: event.id,
      productId: product.id,
      event,
      product,
    }));
    await this.eventProductRepository.save(eventProducts);

    // 이벤트-해시태그 테이블에 매핑
    const eventHashtags = dto.tagIds.map((tagId) => ({
      eventId: event.id,
      hashtagId: tagId,
      event,
      hashtag: { id: tagId } as Hashtag,
    }));
    await this.eventHashtagRepository.save(eventHashtags);

    // 이벤트 생성 결과 DTO 생성
    const createEventResultDto = plainToInstance(CreateEventResultDto, {
      id: event.id,
      thumbnail: event.thumbnail,
    });

    return new CustomResponse<CreateEventResultDto>(
      200,
      "E001",
      createEventResultDto,
    );
  }

  // 이벤트 개별 조회
  async getEventById(id: number): Promise<IResponse<GetEventDto>> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });

    const eventDto = plainToInstance(GetEventDto, event);

    return new CustomResponse<GetEventDto>(200, "E002", eventDto);
  }

  // 이벤트 삭제
  async deleteEventById(id: number): Promise<IResponse<null>> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ["eventProducts", "eventHashtags"],
    });

    const now = new Date();

    for (const eventProduct of event.eventProducts) {
      eventProduct.deletedAt = now;
      eventProduct.isDeleted = true;
      await this.eventProductRepository.save(eventProduct);
    }

    for (const eventHashtag of event.eventHashtags) {
      eventHashtag.deletedAt = now;
      eventHashtag.isDeleted = true;
      await this.eventHashtagRepository.save(eventHashtag);
    }

    const images = await this.imagesRepository.find({
      where: { targetId: id, type: RaffleType.EVENT },
    });

    for (const image of images) {
      image.deletedAt = now;
      image.isDeleted = true;
      await this.imagesRepository.save(image);
    }

    event.deletedAt = now;
    event.isDeleted = true;
    await this.eventRepository.save(event);

    return new CustomResponse<null>(204, "E003", null);
  }

  async increaseViewCount(id: number): Promise<void> {
    await this.eventRepository.increment({ id }, "viewCount", 1);
  }
}
