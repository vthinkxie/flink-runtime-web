import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizeDurationPipe } from './humanize-duration.pipe';
import { HumanizeBytesPipe } from './humanize-bytes.pipe';
import { HumanizeDatePipe } from './humanize-date.pipe';
import { HumanizeWatermarkPipe } from './humanize-watermark.pipe';

@NgModule({
  imports     : [
    CommonModule
  ],
  declarations: [
    HumanizeDurationPipe,
    HumanizeBytesPipe,
    HumanizeWatermarkPipe,
    HumanizeDatePipe
  ],
  exports     : [
    HumanizeDurationPipe,
    HumanizeBytesPipe,
    HumanizeWatermarkPipe,
    HumanizeDatePipe
  ]
})
export class PipeModule {
}
