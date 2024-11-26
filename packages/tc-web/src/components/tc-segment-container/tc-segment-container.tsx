// segment-container.tsx
import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "segment-container",
  shadow: true,
})
export class SegmentContainer {
  @Prop({ attribute: "title" }) segTitle: string;
  @Prop() backgroundColor: string;

  render() {
    const style = this.backgroundColor
      ? { "background-color": this.backgroundColor }
      : {};

    return (
      <Host class="m-0" style={style}>
        <div class="px-0 py-4  m-0 md:py-8 font-sans font-normal">
          <div class="m-auto max-w-[90rem]">
            {this.segTitle && (
              <h3 class="mb-12 text-2xl md:text-4xl text-center font-semibold">
                {this.segTitle}
              </h3>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
