export const customStyles = {
    control: (styles) => ({
        ...styles,
        width: "14rem",
        boxShadow: 'none',
        '&:hover': {
            border: '2px solid #00DBA7',
        },
        borderRadius: "5px",
        color: "#00DBA7",
        fontSize: "1rem",
        lineHeight: "1.75rem",
        backgroundColor: "#1A1A1E",
        cursor: "pointer",
        border: "2px solid #4F4F4F",
    }),

    option: (styles) => {
        return {
            ...styles,
            color: "#00DBA7",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#1A1A1E",
            ":hover": {
                backgroundColor: "rgba(0, 219, 167, 0.76)",
                color: "#FFF",
                cursor: "pointer",
            },
        };
    },

    menu: (styles) => {
        return {
            ...styles,
            backgroundColor: "#1A1A1E",
            maxWidth: "14rem",
            border: "2px solid #000000",
            borderRadius: "5px",
        };
    },

    menuList: (styles) => ({
        ...styles,

        "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#1f2024"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#00DBA7"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#00DBA7"
        }
    }),

    singleValue: (styles) => {
        return {
            ...styles,
            color: "#00DBA7",
            fontSize: "1rem",
            lineHeight: "1.75rem",
        };
    },

    dropdownIndicator: (styles) => {
        return {
            ...styles,
            color: "#00DBA7",
            cursor: "pointer",
        };
    }
}