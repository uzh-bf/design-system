import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-grid-item",
  shadow: true,
})
export class GridItem {
  @Prop() imageSrc: string;
  @Prop({ attribute: "title" }) giTitle: string;
  @Prop() link: string;
  @Prop() width: string = "lg";

  render() {
    const gridItemStyle = `flex flex-col items-center font-normal shadow-md font-sans m-2 ${this.getWidth()}`;
    return (
      <div class={gridItemStyle}>
        <div class="relative w-8 h-8 mt-2 md:w-12 md:h-12 md:mt-4 lg:w-16 lg:h-16 lg:mt-6">
          <div class="w-full pb-[100%] relative">
            <a href={this.link} target="_blank" rel="noopener noreferrer">
              <img
                src={this.imageSrc}
                alt={this.giTitle}
                class="absolute w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
        <a
          href={this.link}
          target="_blank"
          rel="noopener noreferrer"
          class="no-underline  text-inherit"
        >
          <p class="mt-1 md:mt-2 text-base md:text-lg text-center">
            {this.giTitle}
          </p>
        </a>
      </div>
    );
  }

  private getWidth(): string {
    switch (this.width) {
      case "2xl":
        return "mx-1 md:mx-2 lg:mx-4";
      case "xl":
        return "mx-2 md:mx-4 lg:mx-8";
      case "lg":
        return "mx-4 md:mx-8 lg:mx-16";
      case "md":
        return "mx-8 md:mx-16 lg:mx-24";
      case "sm":
        return "mx-16 md:mx-24 lg:mx-30";
      case "xs":
        return "mx-24 md:mx-32 lg:mx-40";
      default:
        return "mx-2 md:mx-4 lg:mx-8";
    }
  }
}
