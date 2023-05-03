import register from "preact-custom-element";

import { H1, H2, H3, H4 } from "./Header";

register(H1, "x-h1", ["text"], {
  shadow: true,
});
register(H2, "x-h2", ["text"], {
  shadow: true,
});
register(H3, "x-h3", ["text"], {
  shadow: true,
});
register(H4, "x-h4", ["text"], {
  shadow: true,
});
