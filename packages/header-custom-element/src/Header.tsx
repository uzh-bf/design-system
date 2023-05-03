// @ts-ignore
import htm from "htm";

import { h } from "preact";

import {
  H1 as BFH1,
  H2 as BFH2,
  H3 as BFH3,
  H4 as BFH4,
} from "@uzh-bf/design-system-react-header";

import cssText from "bundle-text:./styles.css";

const html = htm.bind(h);

// TODO: if possibly, try to use children logic for x-h1 to x-h4 components as well (would be more similar to the standard h1 to h4 tags and the react implementation)
interface HeaderProps {
  // id?: string;
  // data?: {
  //   cy?: string;
  //   test?: string;
  // };
  // className?: {
  //   root?: string;
  // };
  text: string;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h1 tag.
 *
 * @param text - The content of the header.
 * @returns Header H1 component
 */
export function H1({ text = "" }: HeaderProps) {
  return html`
    <Fragment>
      <${BFH1}>${text}</${BFH1}>
      <style>
        ${cssText}
      </style>
    </Fragment>
  `;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default H2 tag.
 *
 * @param text - The content of the header.
 * @returns Header H2 component
 */
export function H2({ text = "" }: HeaderProps) {
  return html`
    <Fragment>
      <${BFH2}>${text}</${BFH2}>
      <style>
        ${cssText}
      </style>
    </Fragment>
  `;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default H3 tag.
 *
 * @param text - The content of the header.
 * @returns Header H3 component
 */
export function H3({ text = "" }: HeaderProps) {
  return html`
    <Fragment>
      <${BFH3}>${text}</${BFH3}>
      <style>
        ${cssText}
      </style>
    </Fragment>
  `;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default H4 tag.
 *
 * @param text - The content of the header.
 * @returns Header H4 component
 */
export function H4({ text = "" }: HeaderProps) {
  return html`
    <Fragment>
      <${BFH4}>${text}</${BFH4}>
      <style>
        ${cssText}
      </style>
    </Fragment>
  `;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the chosen h* tag.
 */
const Header = {
  H1,
  H2,
  H3,
  H4,
};

export default Header;
