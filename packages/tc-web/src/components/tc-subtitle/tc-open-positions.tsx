import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-open-positions",
  shadow: true,
  styleUrl: "../../util/base.css",
})
export class OpenPositions {
  @Prop() level: string; // Corrected the property name spelling.

  render() {
    return (
      <div class="mt-8 md:mt-0 font-sans">
        <h4 class="text-xl font-bold ">{this.level}</h4>
        <div class="slot-container flex flex-col content-center">
          <slot onSlotchange={this.handleSlotChange}> </slot>
        </div>
      </div>
    );
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    if (nodes.length === 0) {
      this.renderFallbackMessage();
    }
  }

  private renderFallbackMessage() {
    const container = document.querySelector(".slot-container");
    container.innerHTML = `
      <div class="p-4 border-2 border-gray-200 border-solid rounded">
        <h5 class="text-lg font-normal">
          Currently no positions advertised
        </h5>
      </div>
    `;
  }
}
