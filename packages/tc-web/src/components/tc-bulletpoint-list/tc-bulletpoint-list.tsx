import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-bulletpoint-list",
  styleUrl: "tc-bulletpoint-list.css",
  shadow: true,
})
export class BulletpointList {
  @Prop({ attribute: "title" }) header: string;
  @Prop() bulletpoints: "[]";
  @Prop() backgroundColor: string = "rgb(255, 255, 255)";

  get bulletpointArray() {
    try {
      return JSON.parse(this.bulletpoints);
    } catch (e) {
      console.error("Error parsing tags:", e);
      return [];
    }
  }

  render() {
    return (
      <div
        class="px-4 py-2 font-sans shadow-md m-2"
        style={{ backgroundColor: this.backgroundColor }}
      >
        <h4 class="text-2xl  md:text-3xl leading-normal text-center px-4">
          {this.header}
        </h4>

        <ul class="pl-4 md:pl-6 lg:pl-8">
          {this.bulletpointArray.map((bulletpoint, index) => (
            <li key={index} class="mt-1 text-base md:text-lg">
              {bulletpoint}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
