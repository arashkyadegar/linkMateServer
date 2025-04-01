import { BaseLinkDto } from 'src/common/dtos/base-link.dto';

export class CreateShortLinkDto extends BaseLinkDto {
  isSingleUse: boolean = false; // Default is false, meaning not single-use.

  isUsed: boolean = false; // Tracks usage status.
}
