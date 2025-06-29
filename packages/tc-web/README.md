# TC Webcomponent

Latest version published "tc-web@0.0.6"

This repo is for the web-components library for the TC. Technologies used are stencil-tailwind-plugin and StencilJS.

## How to use the Components in Magnolia (or other CMS)

Create a new Component in Magnolia.

<img src="ReadMeImages\Add_Component_Magnolia.png" alt="Adding a component in Magnolia" width="500"/>

Make sure you create it as a HTML component.

<img src="ReadMeImages\HTML_Select.png" alt="Make sure to select a HTML Component" width="500"/>

A code field then appears.

### Import library

To use these webcomponents you must import the library.

#### Import specific version (recommended)

To get a **specific version of this libary** recommended and won't be affected by change in the code you can get by running:
Usually you want to get the most recent version published, but want to fix it to that version, since future versions may not suport the elements you are using.

```html
<script
  type="module"
  src="https://unpkg.com/tc-web@{versionYouWantToGet}"
></script>
```

If for instance you want to get version 1.2.3:

```html
<script type="module" src="https://unpkg.com/tc-web@1.2.3"></script>
```

#### Always get latest version (not recommended)

To get the latest version, **not recommend**. you can install it like this.

```html
<script type="module" src="https://unpkg.com/tc-web@latest"></script>
```

### How to use a component

Make sure that you have first imported the library.

Example

```html
<tc-testimonial
  image-src="https://joinus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpascal.cd3140df.jpg&w=1920&q=75"
  quote="I loved being able to work everywehre"
  name="Lewis Hamilton"
  pro="Freedom"
  role="Racer good at right code quickly"
  image-on-left="false"
></tc-testimonial>
```

Decide which component you want.
To figure out **what parameters each component takes** and how this needs to be adressed in the html, go to the readme file of the component.
You can find it, as follows:

```
src/components/TheComponent/readme.md
```

If you click [here](src\components\tc-testimonial\readme.md) you will see the example, for tc-testimonial.

## To make changes to the libary here is how you can get started

Clone the repo, and install the dependencies:

```shell
cd tc-web
npm install
```

Start the stencil dev server:

```shell
npm start
```

If you would like to build the application:

```shell
npm run build
```

## UZH Fonts & Colorpalette

To make sure that the fonts and styling are aligned with the [UZH Theme](https://www.frontend.uzh.ch/style/current/)
and the [UZH Color Palette](https://www.cd.uzh.ch/de/elements.html#UZH-Farben), custom fonts and colors where added to the [tailwind configuration file](tailwind.config.js).

### Custom colors (for development and parametrization purposes)

uzhblue: "#0028A5"
uzhcyan: "#4AC9E3",
uzhapple: "#A4D233",
uzhgold: "#FFC845",
uzhorange: "FC4C02",
uzhberry: "#BF0D3E",
uzhlgrey2: "#EFEFEF",
uzhlgrey3: "#E7E7E7"

### Adding colors yourself

For specfic elements like the sections you can modify the color.
You can **input color as a hex string** like below (currently we are setting it to black)

```html
<segment-container seg-title="Benefits" background-color="#000000">
</segment-container>
```

Or like this in **rgb format**

```html
<segment-container seg-title="Benefits" background-color="rgb(0,0,0)">
</segment-container>
```

### Fonts

The UZH page uses "[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)", previously known as "Source Sans Pro", as default font.
To use it, you can "font-sans".
Make sure to apply it to each component, to use it.
