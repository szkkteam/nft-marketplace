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

@Controller('/api/v1/asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('/import')
  async import(@Res() response, @Body() asset: AssetImport) {
    const newAsset = await this.assetService.import(asset.address);

    return response.status(HttpStatus.CREATED).json({ newAsset });
  }

  @Get()
  async listAll() {
    console.log("list all asset")
    return this.assetService.listAll();
  }

  @Get(':slug')
  async getBySlug(@Param() params) {
    
    return this.assetService.getBySlug(params.slug);
  }
}
