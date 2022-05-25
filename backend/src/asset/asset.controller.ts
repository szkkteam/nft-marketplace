import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { AssetService } from './asset.service';
import { Asset } from './asset.schema';

interface AssetImport {
  address: string;
}

@Controller('/api/v1')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('/asset/import')
  async import(@Res() response, @Body() asset: AssetImport) {
    const newAsset = await this.assetService.import(asset.address);

    return response.status(HttpStatus.CREATED).json({ newAsset });
  }

  @Get('/asset')
  async listAll() {
    console.log("list all asset")
    return this.assetService.listAll();
  }

  @Get('asset/:slug')
  async getBySlug(@Param() params) {
    
    return this.assetService.getBySlug(params.slug);
  }

  @Get('/mint')
  async getMints(@Param() params) {
    return this.assetService.getAllMint();
  }

  @Get('/mint/:slug')
  async getMint(@Param() params) {
    return this.assetService.getMint(params.slug);
  }
}
