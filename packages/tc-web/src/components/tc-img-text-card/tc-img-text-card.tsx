import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'tc-img-text-card',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class TcImgTextCard {
  @Prop() imageSrc: string
  @Prop({ attribute: 'title' }) tcImgTextCardTitle: string
  @Prop() shortDescription: string
  @Prop() detailedDescription: string
  @Prop() imageOnLeft: boolean = false
  @Prop() borderColor: string = ''

  render() {
    const imageClass = this.imageOnLeft ? 'lg:order-1' : 'lg:order-2'
    const textClass = this.imageOnLeft ? 'lg:order-2' : 'lg:order-1'
    const borderStyle = this.borderColor
      ? `border-${this.borderColor} border-solid`
      : ''

    return (
      <div
        class={`m-2 mt-6 max-w-[90rem] p-2 font-sans md:p-4 ${borderStyle} font-normal shadow-md`}
      >
        <div class="flex flex-col gap-16 md:gap-24">
          <div class="lg:items-top flex flex-col lg:flex-row">
            <div class={`order-1 flex-1 items-center p-1 md:p-4 ${imageClass}`}>
              <img
                src={this.imageSrc}
                alt={this.tcImgTextCardTitle}
                class="max-h- p-auto m-auto h-auto max-w-full"
              />
            </div>
            <div class={`items-top order-2 flex-1 p-4 ${textClass}`}>
              <h4 class="m-0 text-xl font-semibold md:text-3xl">
                {this.tcImgTextCardTitle}
              </h4>
              <p class="text-l mb-1 md:text-xl">{this.shortDescription}</p>
              <p>{this.detailedDescription}</p>
              <div class="mt-2 flex flex-row flex-wrap gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
