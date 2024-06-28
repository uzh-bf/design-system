import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-svg-icon-card",
  styleUrl: "tc-svg-icon-card.css",
  shadow: true,
})
export class SVGIconCard {
  @Prop({ attribute: "title" }) advantageTitle: string;
  @Prop() text: string;
  @Prop() iconSvgPath: string;
  @Prop() iconSvgViewBox: string;
  @Prop() iconColor: string = "rgb(255, 255, 255)";
  @Prop() iconBackground: string = "rgb(0, 0, 0)";
  @Prop() iconSvgXmlns: string = "http://www.w3.org/2000/svg";
  @Prop() backgroundColor: string = "rgb(255, 255, 255)";

  render() {
    return (
      <div
        class="flex flex-col items-center shadow-md m-2 font-sans w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg break-all h-full"
        style={{ backgroundColor: this.backgroundColor }}
      >
        <div
          class="flex flex-col w-24 h-24 md:w-36 md:h-36 rounded-full items-center justify-center mt-2"
          style={{ backgroundColor: this.iconBackground }}
        >
          <svg
            class="md:h-24 md:w-24 h-12 w-10 p-2"
            xmlns={this.iconSvgXmlns}
            viewBox={this.iconSvgViewBox}
          >
            <path d={this.iconSvgPath} fill={this.iconColor} />
          </svg>
        </div>
        <h3 class="text-xl md:text-3xl mt-4 mb-0 text-center">
          {this.advantageTitle}
        </h3>
        <p class="md:text-lg px-2 pt-0 mx-3 mt-2 text-center break-words">
          {this.text}
        </p>
      </div>
    );
  }
}
