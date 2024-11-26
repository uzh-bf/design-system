import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-img-quote-card",
  shadow: true,
})
export class ImgQuoteCard {
  @Prop() quote: string;
  @Prop() quotee: string;
  @Prop() imageOnLeft: boolean = false;
  @Prop() imageSrc: string;
  @Prop({ attribute: "title" }) pro: string;
  @Prop() altText: string = "Picture";
  @Prop() backgroundColor: string = "#FFFFFF";
  @Prop() borderColor: string = "";

  render() {
    const imageSection = (
      <div
        class={{
          "order-1": true, // Image always first on small screens
          "md:order-1": this.imageOnLeft, // Order on medium screens
          "md:order-2": !this.imageOnLeft, // Order on medium screens
          "w-6/10 md:w-[330px]": true,
          "px-4": true,
        }}
      >
        <img
          alt={this.altText}
          src={this.imageSrc}
          class="object-cover max-w-full "
        />
      </div>
    );

    const textSection = (
      <div
        class={{
          "flex-1": true,
          "order-2": true, // Text always second on small screens
          "md:order-2": this.imageOnLeft, // Order on medium screens
          "md:order-1": !this.imageOnLeft, // Order on medium screens
          "px-4": true,
          "font-sans": true,
          "font-normal": true,
        }}
      >
        <h3 class="text-2xl font-semibold">{this.pro}</h3>
        <blockquote
          class={{
            "text-lg": true,
            "m-0": true,
            "mb-1": true,
            "font-sans": true,
            "font-normal": true,
          }}
        >
          <span class="text-4xl text-gray-400">“</span>
          <p class="inline leading-loose">{this.quote}</p>
          <span class="text-4xl text-gray-400 leading-none">”</span>
        </blockquote>
        <div class="text-justify italic">
          <p>{this.quotee}</p>
        </div>
      </div>
    );

    return (
      <div
        class={{
          flex: true,
          "flex-col": true,
          "items-center": true,
          "w-full": true,
          "gap-8": true,
          "px-4": true,
          "py-2": true,
          "md:pb-6": true,
          "md:flex-row": true,
          "m-2": true,
          "shadow-md": true,
        }}
        style={{ background: this.backgroundColor }}
      >
        {imageSection}
        {textSection}
      </div>
    );
  }
}
