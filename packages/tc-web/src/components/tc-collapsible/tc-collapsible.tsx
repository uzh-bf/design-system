import { Component, h, Prop, State } from "@stencil/core";
import { parseTags } from "../../util/util";

@Component({
  tag: "tc-collapsible",
  shadow: true,
})
export class TcCollapsible {
  @Prop() colTitle: string;
  @Prop() description: string = "";
  @Prop() tags: string = "[]";
  @Prop() backgroundColor: string = "rgb(255, 255, 255)";

  @State() showDetails: boolean = false;
  toggleDetails = () => {
    this.showDetails = !this.showDetails;
  };

  render() {
    return (
      <div
        class={{
          "px-3": true,
          "py-2": true,
          border: true,
          "border-gray-200": true,
          "border-solid": true,
          shadow: true,
          "md:p-4": true,
          "md:px-6": true,
          "font-sans": true,
          "font-normal": true,
          "mb-2": true,
        }}
        style={{ backgroundColor: this.backgroundColor }}
      >
        <div class="flex flex-col items-start justify-between md:flex-row">
          <div>
            <h4 class="!m-0 text-xl md:text-3xl font-semibold">
              {this.colTitle}
            </h4>
            <div class="mt-2 text-lg">{this.description}</div>
            <div class=" mt-2 md:block">
              <button
                class="text-white font-semibold bg-uzhblue border-uzhblue hover:text-white py-2 px-4 border hover:border-transparent rounded-full cursor-pointer"
                onClick={this.toggleDetails}
              >
                {this.showDetails ? "Weniger Details" : "Mehr Details"}
              </button>
            </div>
          </div>
          <div class="flex flex-row flex-wrap gap-2 mt-2">
            {parseTags(this.tags).map((tag) => (
              <div class="px-2 py-1 text-gray-600 bg-gray-200 md:mt-0 font-medium">
                {tag}
              </div>
            ))}
          </div>
        </div>
        {this.showDetails && <slot></slot>}
      </div>
    );
  }
}
