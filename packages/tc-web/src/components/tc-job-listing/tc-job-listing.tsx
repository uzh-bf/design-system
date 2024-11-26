import { Component, Prop, h } from "@stencil/core";
import { parseTags } from "../../util/util";

@Component({
  tag: "tc-job-listing",
  shadow: true,
})
export class JobListing {
  @Prop() jobTitle: string;
  @Prop() description: string;
  @Prop() tags: string;
  @Prop() imageSrc: string;

  render() {
    return (
      <div class="flex flex-col font-sans items-start border-uzhblue border-solid justify-between md:flex-row px-3 py-2 ">
        <div class="p-2">
          <h5 class="text-xl font-bold pl-1 m-0">{this.jobTitle}</h5>
          <p class="p-1">{this.description}</p>
          <ul class="flex flex-row flex-wrap gap-2 mt-2 pl-1">
            {parseTags(this.tags).map((tag) => (
              <div class="px-2 py-1 text-gray-600 bg-gray-200 md:mt-0 font-medium">
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
    );
  }
}
