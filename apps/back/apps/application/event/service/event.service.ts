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
import { ModifyEventDto } from "apps/application/event/dto/request/modify-event.dto";
import { ResourceNotFoundException } from "apps/infrastructure/error";

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

  // TODO: Error 처리는 추후에 통일
  // TODO: SignUp API 추가 되면 테스트 후 @CurrentUser()로 사용자 정보 가져와서 createUserId에 넣어주기
  @Transactional()
  async createEvent(
    dto: CreateEventDto,
  ): Promise<IResponse<CreateEventResultDto>> {
    // 이벤트 생성
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
        isDeleted: false,
      },
      select: [
        "id",
        "title",
        "price",
        "startDate",
        "endDate",
        "announceAt",
        "description",
        "etc",
        "status",
        "clipCount",
        "applyCount",
        "createUserId",
      ],
      relations: [
        "eventProducts",
        "eventHashtags",
        "eventProducts.product.productHashtags",
      ],
    });

    const images = await this.imagesRepository.find({
      where: { targetId: id, type: RaffleType.EVENT },
    });

    if (!event) {
      throw new ResourceNotFoundException("이벤트를 찾을 수 없습니다.", "E001");
    }

    const eventDto = plainToInstance(GetEventDto, {
      ...event,
      type: RaffleType.EVENT,
      tagIds: event.eventHashtags.map((eh) => eh.hashtagId),
      images: images.map((image) => image.url),
      products: event.eventProducts.map((ep) => ({
        id: ep.product.id,
        name: ep.product.title,
        imageUrl: ep.product.imageUrl,
        tagIds: (ep.product.productHashtags || []).map((ph) => ph.hashtagId),
      })),
    });

    return new CustomResponse<GetEventDto>(200, "E002", eventDto);
  }

  // 이벤트 수정
  @Transactional()
  async modifyEventById(
    id: number,
    dto: ModifyEventDto,
  ): Promise<IResponse<any>> {
    const event = await this.eventRepository.findOne({
      where: { id, isDeleted: false },
      relations: ["eventProducts", "eventHashtags"],
    });

    if (!event) {
      throw new ResourceNotFoundException("이벤트를 찾을 수 없습니다.", "E001");
    }

    // 이벤트 데이터 업데이트
    event.title = dto.title;
    event.price = dto.price;
    event.startDate = dto.startDate;
    event.endDate = dto.endDate;
    event.announceAt = dto.announceAt;
    event.description = dto.description;
    event.etc = dto.etc;
    event.categoryId = dto.categoryId;
    event.thumbnail = dto.images[0];
    event.updatedAt = new Date();

    await this.eventRepository.save(event);

    // 이미지 업데이트
    const existingImages = await this.imagesRepository.find({
      where: { targetId: event.id, type: RaffleType.EVENT },
    });

    for (let i = 0; i < dto.images.length; i++) {
      if (existingImages[i]) {
        existingImages[i].url = dto.images[i];
        await this.imagesRepository.save(existingImages[i]);
      } else {
        const newImage = this.imagesRepository.create({
          url: dto.images[i],
          type: RaffleType.EVENT,
          targetId: event.id,
        });
        await this.imagesRepository.save(newImage);
      }
    }

    // 해시태그 업데이트
    const existingEventHashtags = await this.eventHashtagRepository.find({
      where: { eventId: event.id },
    });

    // 기존 해시태그를 새로운 해시태그로 교체
    for (let i = 0; i < dto.tagIds.length; i++) {
      if (existingEventHashtags[i]) {
        existingEventHashtags[i].hashtagId = dto.tagIds[i];
        await this.eventHashtagRepository.save(existingEventHashtags[i]);
      } else {
        const newEventHashtag = this.eventHashtagRepository.create({
          eventId: event.id,
          hashtagId: dto.tagIds[i],
        });
        await this.eventHashtagRepository.save(newEventHashtag);
      }
    }

    return new CustomResponse<any>(200, "E003", { id: event.id });
  }

  async increaseViewCount(id: number): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event || event.isDeleted) {
      return;
    }
    await this.eventRepository.increment({ id }, "viewCount", 1);
  }
}
