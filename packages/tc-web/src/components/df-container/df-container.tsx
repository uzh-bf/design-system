import { Component, h } from '@stencil/core'

@Component({
  tag: 'df-container',
  shadow: true,
  styleUrl: '../../util/base.css',
})
export class Container {
  render() {
    return (
      <li class="my-0 ml-0 mr-10 block h-64 w-64 flex-none cursor-grab break-words p-0 text-left align-top leading-7">
        <article class="relative m-0 flex min-h-full flex-col bg-white p-0 text-left shadow">
          <div class="relative m-0 break-words p-0">
            <div class="relative m-0 w-full max-w-full cursor-grab p-0">
              <div class="absolute left-0 top-0 m-0 h-full w-full overflow-hidden p-0">
                <img
                  class="m-0 block h-full w-full select-none border-0 object-cover p-0 align-middle"
                  src="https://www.df.uzh.ch/dam/jcr:08abca24-1bed-47e3-8d58-d339b1fa02fe/SGF%202025.JPG"
                  alt=""
                />
              </div>
            </div>
            <a
              class="absolute left-0 top-0 m-0 h-full w-full cursor-pointer p-0"
              href="http://www.df.uzh.ch/en/news-events/events/2025/SGF-conference.html"
              aria-hidden="true"
              tabindex="-1"
            >
              <span class="sr-only">More about SGF Conference 2025</span>
            </a>
          </div>
          <div class="m-0 flex flex-grow flex-col break-words p-8">
            <div class="mx-0 mb-2 mt-0 flex gap-2 p-0 text-sm font-normal leading-normal text-neutral-600">
              <time itemprop="dateCreated" class="m-0 p-0 leading-5">
                4 Apr 2025
              </time>
            </div>
            <h3 class="mx-0 mb-2 mt-0 p-0 text-lg font-semibold text-neutral-900">
              SGF Conference 2025
            </h3>
            <div class="mx-0 mb-4 mt-0 p-0 text-lg font-normal text-neutral-600">
              <p class="m-0 cursor-grab p-0">
                Chaired by Alexander Wagner and organized by the Department of
                Finance
              </p>
            </div>
            <div class="mx-0 mb-0 mt-auto cursor-grab p-0">
              <a
                class="Link"
                href="http://www.df.uzh.ch/en/news-events/events/2025/SGF-conference.html"
              >
                More
                <span class="sr-only cursor-pointer">
                  about SGF Conference 2025
                </span>
              </a>
            </div>
          </div>
        </article>
      </li>
    )
  }
}
