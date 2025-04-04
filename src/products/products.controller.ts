import { Controller, Logger, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  logger = new Logger()

  // @Post()
  @MessagePattern({cmd : 'create_product'})
  create(@Payload () createProductDto: CreateProductDto) {
    this.logger.log(createProductDto)
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({cmd : 'find_all'})
  findAll(
    @Payload() paginationDto: PaginationDto
  ) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({cmd : 'find_one'})
  findOne(@Payload('id', ParseIntPipe ) id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({cmd : 'update'})
  update(
    // @Param('id') id: string, 
    // @Body() updateProductDto: UpdateProductDto
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(updateProductDto.id!!, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({cmd : 'remove'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern({cmd: 'validate_product'})
  validateProducts(@Payload() ids: number[]){
    return this.productsService.validateProducts(ids)
  }
}
