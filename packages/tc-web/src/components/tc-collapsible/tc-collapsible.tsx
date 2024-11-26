import { Component, h, Prop, State } from '@stencil/core'
import { parseTags } from '../../util/util'

@Component({
  tag: 'tc-collapsible',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class TcCollapsible {
  @Prop() colTitle: string
  @Prop() description: string = ''
  @Prop() tags: string = '[]'
  @Prop() backgroundColor: string = 'rgb(255, 255, 255)'

  @State() showDetails: boolean = false
  toggleDetails = () => {
    this.showDetails = !this.showDetails
  }

  render() {
    return (
      <div
        class={{
          'px-3': true,
          'py-2': true,
          border: true,
          'border-gray-200': true,
          'border-solid': true,
          shadow: true,
          'md:p-4': true,
          'md:px-6': true,
          'font-sans': true,
          'font-normal': true,
          'mb-2': true,
        }}
        style={{ backgroundColor: this.backgroundColor }}
      >
        <div class="flex flex-col items-start justify-between md:flex-row">
          <div>
            <h4 class="!m-0 text-xl font-semibold md:text-3xl">
              {this.colTitle}
            </h4>
            <div class="mt-2 text-lg">{this.description}</div>
            <div class="mt-2 md:block">
              <button
                class="cursor-pointer rounded-full border border-uzhblue bg-uzhblue px-4 py-2 font-semibold text-white hover:border-transparent hover:text-white"
                onClick={this.toggleDetails}
              >
                {this.showDetails ? 'Weniger Details' : 'Mehr Details'}
              </button>
            </div>
          </div>
          <div class="mt-2 flex flex-row flex-wrap gap-2">
            {parseTags(this.tags).map((tag) => (
              <div class="bg-gray-200 px-2 py-1 font-medium text-gray-600 md:mt-0">
                {tag}
              </div>
            ))}
          </div>
        </div>
        {this.showDetails && <slot></slot>}
      </div>
    )
  }
}
