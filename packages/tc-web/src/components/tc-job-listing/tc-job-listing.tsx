import { Component, Prop, h } from '@stencil/core'
import { parseTags } from '../../util/util'

@Component({
  tag: 'tc-job-listing',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class JobListing {
  @Prop() jobTitle: string
  @Prop() description: string
  @Prop() tags: string
  @Prop() imageSrc: string

  render() {
    return (
      <div class="flex flex-col items-start justify-between px-3 py-2 font-sans shadow md:flex-row">
        <div class="p-2">
          <h5 class="m-0 pl-1 text-xl font-bold">{this.jobTitle}</h5>
          <p class="p-1">{this.description}</p>
          <ul class="mt-2 flex flex-row flex-wrap gap-2 pl-1">
            {parseTags(this.tags).map((tag) => (
              <div class="bg-gray-200 px-2 py-1 font-medium text-gray-600 md:mt-0">
                {tag}
              </div>
            ))}
          </ul>
        </div>
        <div>
          <img
            src={this.imageSrc}
            alt="Job related image"
            class="max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    )
  }
}
