import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "tc-grid-container",
  shadow: true,
})
export class TcGridContainer {
  @Prop() mdColumns: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Prop() lgColumns: 1 | 2 | 3 | 4 | 5 | 6 = 4;
  @Prop() columns: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Prop() gap: "sm" | "md" | "lg" | "xl" = "md";
  @Prop() backgroundColor: string = "rgb(255, 255, 255)";

  // Default to 2 columns

  render() {
    const gridClasses = `grid ${this.getMdColumns()} ${this.getColumns()} ${this.getGap()} ${this.getLgColumns()}`;
    return (
      <div
        class={gridClasses}
        style={{ backgroundColor: this.backgroundColor }}
      >
        <slot></slot>
      </div>
    );
  }

  private getMdColumns(): string {
    switch (this.mdColumns) {
      case 1:
        return "md:grid-cols-1";
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3 ";
      case 4:
        return "md:grid-cols-4 ";
      case 5:
        return "md:grid-cols-5 ";
      case 6:
        return "md:grid-cols-6";
    }
  }

  private getLgColumns(): string {
    switch (this.lgColumns) {
      case 1:
        return "lg:grid-cols-1";
      case 2:
        return "lg:grid-cols-2";
      case 3:
        return "lg:grid-cols-3";
      case 4:
        return "lg:grid-cols-4";
      case 5:
        return "lg:grid-cols-5";
      case 6:
        return "lg:grid-cols-6";
    }
  }

  private getColumns(): string {
    switch (this.columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2 ";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
    }
  }

  private getGap(): string {
    switch (this.gap) {
      case "sm":
        return "gap-2 md:gap-4 lg:gap-6";
      case "md":
        return "gap-4 md:gap-8 lg:gap-12";
      case "lg":
        return "gap-8 md:gap-12 lg:gap-16";
      case "xl":
        return "gap-12 md:gap-16 lg: gap-20";
      default:
        return `gap-4 md:gap-8 lg:gap-12`;
    }
  }
}
