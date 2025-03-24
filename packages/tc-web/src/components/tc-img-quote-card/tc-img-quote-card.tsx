import { Component, Prop, h } from '@stencil/core'
import { cn } from '../../util/util'

@Component({
  tag: 'tc-img-quote-card',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class ImgQuoteCard {
  @Prop() quote: string
  @Prop() quotee: string
  @Prop() imageOnLeft: boolean = false
  @Prop() imageSrc: string
  @Prop({ attribute: 'title' }) pro: string
  @Prop() altText: string = 'Picture'
  @Prop() backgroundColor: string = '#FFFFFF'
  @Prop() borderColor: string = ''

  render() {
    return (
      <div
        class={cn(
          'm-2 flex w-full flex-col items-center gap-8 px-4 py-2 shadow-md md:flex-row md:pb-6'
        )}
        style={{ background: this.backgroundColor }}
      >
        <div
          class={cn(
            'w-6/10 order-1 px-4 md:w-[330px]',
            this.imageOnLeft ? 'md:order-1' : 'md:order-2'
          )}
        >
          <img
            alt={this.altText}
            src={this.imageSrc}
            class="max-w-full object-cover"
          />
        </div>
        <div
          class={cn(
            'order-2 flex-1 px-4 font-sans font-normal',
            this.imageOnLeft ? 'md:order-2' : 'md:order-1'
          )}
        >
          <h3 class="text-2xl font-semibold">{this.pro}</h3>
          <blockquote
            class={cn('bg-uzh-grey-20 m-0 mb-1 font-sans text-lg font-normal')}
          >
            <span class="text-4xl text-gray-400">“</span>
            <p class="inline leading-loose">{this.quote}</p>
            <span class="text-4xl leading-none text-gray-400">”</span>
          </blockquote>
          <div class="text-justify italic">
            <p>{this.quotee}</p>
          </div>
        </div>
      </div>
    )
  }
}
