import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { PaginationMetaData } from "./pagination-meta-data.dto";

export interface IPaginated<T> {
  items: T[];
  pagination: PaginationMetaData;
}

export function BasePaginatedDto<D>(
  DtoClass: Type<D>,
  resourceName?: string,
): Type<IPaginated<D>> {
  class PaginatedHost<D> implements IPaginated<D> {
    @ApiProperty({ isArray: true, type: () => DtoClass })
    items: D[];

    @ApiProperty({ type: () => PaginationMetaData })
    pagination: PaginationMetaData;

    constructor(
      items: D[],
      totalItemCount: number,
      currentPage: number,
      itemsPerPage: number,
    ) {
      const totalPage = Math.ceil(totalItemCount / itemsPerPage);

      this.items = items;
      this.pagination = {
        totalItemCount,
        currentItemCount: items.length,
        totalPage: totalPage === 0 ? 1 : totalPage,
        currentPage,
        itemsPerPage,
      };
    }
  }

  if (resourceName) {
    Object.defineProperty(PaginatedHost, "name", {
      writable: false,
      value: `Paginated${resourceName}ListDto`,
    });
  }

  return PaginatedHost;
}

export class Paginated<E> implements IPaginated<E> {
  items: E[];
  pagination: PaginationMetaData;

  constructor(
    items: E[],
    totalItemCount: number,
    currentPage: number,
    itemsPerPage: number,
  ) {
    const totalPage = Math.ceil(totalItemCount / itemsPerPage);

    this.items = items;
    this.pagination = {
      totalItemCount,
      currentItemCount: items.length,
      totalPage: totalPage === 0 ? 1 : totalPage,
      currentPage,
      itemsPerPage,
    };
  }
}
