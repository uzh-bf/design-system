import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-img-text-card",
  shadow: true,
})
export class TcImgTextCard {
  @Prop() imageSrc: string;
  @Prop({ attribute: "title" }) tcImgTextCardTitle: string;
  @Prop() shortDescription: string;
  @Prop() detailedDescription: string;
  @Prop() imageOnLeft: boolean = false;
  @Prop() borderColor: string = "";

  render() {
    const imageClass = this.imageOnLeft ? "lg:order-1" : "lg:order-2";
    const textClass = this.imageOnLeft ? "lg:order-2" : "lg:order-1";
    const borderStyle = this.borderColor
      ? `border-${this.borderColor} border-solid`
      : "";

    return (
      <div
        class={`m-2 mt-6 max-w-[90rem] p-2 md:p-4 font-sans ${borderStyle} shadow-md font-normal`}
      >
        <div class="flex flex-col gap-16 md:gap-24">
          <div class="flex flex-col lg:flex-row lg:items-top">
            <div class={`items-center flex-1 p-1 md:p-4 order-1 ${imageClass}`}>
              <img
                src={this.imageSrc}
                alt={this.tcImgTextCardTitle}
                class="max-w-full max-h- h-auto p-auto m-auto"
              />
            </div>
            <div class={`items-top flex-1 p-4 order-2 ${textClass}`}>
              <h4 class="text-xl md:text-3xl font-semibold m-0">
                {this.tcImgTextCardTitle}
              </h4>
              <p class="text-l md:text-xl mb-1">{this.shortDescription}</p>
              <p>{this.detailedDescription}</p>
              <div class="flex flex-row flex-wrap gap-2 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
