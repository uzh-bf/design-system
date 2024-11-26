import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'tc-svg-icon-card',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class SVGIconCard {
  @Prop({ attribute: 'title' }) advantageTitle: string
  @Prop() text: string
  @Prop() iconSvgPath: string
  @Prop() iconSvgViewBox: string
  @Prop() iconColor: string = 'rgb(255, 255, 255)'
  @Prop() iconBackground: string = 'rgb(0, 0, 0)'
  @Prop() iconSvgXmlns: string = 'http://www.w3.org/2000/svg'
  @Prop() backgroundColor: string = 'rgb(255, 255, 255)'

  render() {
    return (
      <div
        class="m-2 flex h-full w-full max-w-xs flex-col items-center break-all font-sans shadow-md md:max-w-sm lg:max-w-md xl:max-w-lg"
        style={{ backgroundColor: this.backgroundColor }}
      >
        <div
          class="mt-2 flex h-24 w-24 flex-col items-center justify-center rounded-full md:h-36 md:w-36"
          style={{ backgroundColor: this.iconBackground }}
        >
          <svg
            class="h-12 w-10 p-2 md:h-24 md:w-24"
            xmlns={this.iconSvgXmlns}
            viewBox={this.iconSvgViewBox}
          >
            <path d={this.iconSvgPath} fill={this.iconColor} />
          </svg>
        </div>
        <h3 class="mb-0 mt-4 text-center text-xl md:text-3xl">
          {this.advantageTitle}
        </h3>
        <p class="mx-3 mt-2 break-words px-2 pt-0 text-center md:text-lg">
          {this.text}
        </p>
      </div>
    )
  }
}
