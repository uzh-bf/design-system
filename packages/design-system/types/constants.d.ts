export declare const ESLintConfig: {
    extends: string[];
};

export declare const TailwindAnimations: {
    keyframes: {
        'enter-from-right': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'enter-from-left': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'exit-to-right': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'exit-to-left': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'scale-in-content': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'scale-out-content': {
            '0%': {
                transform: string;
                opacity: number;
            };
            '100%': {
                transform: string;
                opacity: number;
            };
        };
        'fade-in': {
            '0%': {
                opacity: number;
            };
            '100%': {
                opacity: number;
            };
        };
        'fade-out': {
            '0%': {
                opacity: number;
            };
            '100%': {
                opacity: number;
            };
        };
    };
    animation: {
        'enter-from-right': string;
        'enter-from-left': string;
        'exit-to-right': string;
        'exit-to-left': string;
        'scale-in-content': string;
        'scale-out-content': string;
        'fade-in': string;
        'fade-out': string;
    };
};

export declare const TailwindBasePlugins: {
    'postcss-import': {};
    'tailwindcss/nesting': {};
    tailwindcss: {};
    autoprefixer: {};
};

export declare const TailwindColorsUZH: {
    'uzh-blue-100': string;
    'uzh-blue-80': string;
    'uzh-blue-60': string;
    'uzh-blue-40': string;
    'uzh-blue-20': string;
    'uzh-grey-100': string;
    'uzh-grey-80': string;
    'uzh-grey-60': string;
    'uzh-grey-40': string;
    'uzh-grey-20': string;
    'uzh-red-100': string;
    'uzh-red-80': string;
    'uzh-red-60': string;
    'uzh-red-40': string;
    'uzh-red-20': string;
    'uzh-yellow-100': string;
    'uzh-yellow-80': string;
    'uzh-yellow-60': string;
    'uzh-yellow-40': string;
    'uzh-yellow-20': string;
    'uzh-lightgreen-100': string;
    'uzh-lightgreen-80': string;
    'uzh-lightgreen-60': string;
    'uzh-lightgreen-40': string;
    'uzh-lightgreen-20': string;
    'uzh-darkgreen-100': string;
    'uzh-darkgreen-80': string;
    'uzh-darkgreen-60': string;
    'uzh-darkgreen-40': string;
    'uzh-darkgreen-20': string;
    'uzh-turqoise-100': string;
    'uzh-turqoise-80': string;
    'uzh-turqoise-60': string;
    'uzh-turqoise-40': string;
    'uzh-turqoise-20': string;
    'primary-100': string;
    'primary-80': string;
    'primary-60': string;
    'primary-40': string;
    'primary-20': string;
    'secondary-100': string;
    'secondary-80': string;
    'secondary-60': string;
    'secondary-40': string;
    'secondary-20': string;
    border: string;
    input: string;
    ring: string;
    background: string;
    foreground: string;
    primary: {
        DEFAULT: string;
        foreground: string;
    };
    secondary: {
        DEFAULT: string;
        foreground: string;
    };
    destructive: {
        DEFAULT: string;
        foreground: string;
    };
    muted: {
        DEFAULT: string;
        foreground: string;
    };
    accent: {
        DEFAULT: string;
        foreground: string;
    };
    popover: {
        DEFAULT: string;
        foreground: string;
    };
    card: {
        DEFAULT: string;
        foreground: string;
    };
};

export declare const TailwindFonts: {
    sans: string[];
};

export declare const TailwindProdPlugins: {
    cssnano?: {} | undefined;
};

export { }


declare namespace Calendar {
    var displayName: string;
}


declare namespace Tabs {
    var Tab: typeof import("./Tabs").Tab;
    var TabList: typeof import("./Tabs").TabList;
    var TabContent: typeof import("./Tabs").TabContent;
}
