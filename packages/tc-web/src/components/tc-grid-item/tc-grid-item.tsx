import { Component, Prop, h } from '@stencil/core'
import { cn } from '../../util/util'

@Component({
  tag: 'tc-grid-item',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class GridItem {
  @Prop() imageSrc: string
  @Prop({ attribute: 'title' }) giTitle: string
  @Prop() link: string
  @Prop() width: string = 'lg'

  // private getWidth(): string {
  //   switch (this.width) {
  //     case '2xl':
  //       return 'mx-1 md:mx-2 lg:mx-4'
  //     case 'xl':
  //       return 'mx-2 md:mx-4 lg:mx-8'
  //     case 'lg':
  //       return 'mx-4 md:mx-8 lg:mx-16'
  //     case 'md':
  //       return 'mx-8 md:mx-16 lg:mx-24'
  //     case 'sm':
  //       return 'mx-16 md:mx-24 lg:mx-30'
  //     case 'xs':
  //       return 'mx-24 md:mx-32 lg:mx-40'
  //     default:
  //       return 'mx-2 md:mx-4 lg:mx-8'
  //   }
  // }

  render() {
    return (
      <div
        class={cn(
          'm-2 flex w-full flex-col items-center font-sans font-normal shadow-md'
        )}
      >
        <div class="relative mt-2 h-8 w-8 md:mt-4 md:h-12 md:w-12 lg:mt-6 lg:h-16 lg:w-16">
          <div class="relative w-full pb-[100%]">
            <a href={this.link} target="_blank" rel="noopener noreferrer">
              <img
                src={this.imageSrc}
                alt={this.giTitle}
                class="absolute h-full w-full object-contain"
              />
            </a>
          </div>
        </div>
        <a
          href={this.link}
          target="_blank"
          rel="noopener noreferrer"
          class="text-inherit no-underline"
        >
          <p class="mt-1 text-center text-base md:mt-2 md:text-lg">
            {this.giTitle}
          </p>
        </a>
      </div>
    )
  }
}
