// segment-container.tsx
import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'segment-container',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class SegmentContainer {
  @Prop({ attribute: 'title' }) segTitle: string
  @Prop() backgroundColor: string

  render() {
    const style = this.backgroundColor
      ? { 'background-color': this.backgroundColor }
      : {}

    return (
      <Host class="m-0" style={style}>
        <div class="m-0 px-0 py-4 font-sans font-normal md:py-8">
          <div class="m-auto max-w-[90rem]">
            {this.segTitle && (
              <h3 class="mb-12 text-center text-2xl font-semibold md:text-4xl">
                {this.segTitle}
              </h3>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}
