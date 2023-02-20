// TODO: try to use the theme instead of .scss file for every
// style component
import { extendTheme } from "@chakra-ui/react";

const tabListTheme = extendTheme({
	components: {
		Tabs: {
			baseStyle: {
				tab: {
					_selected: {
						color: "bla#0C1059ck",
						borderColor: "#006AFF",
						borderBottom:
							"4px solid #F28416",
						borderRadius: "5px",
					},

					_hover: {
						color: "#006AFF",
					},
				},
			},
		},
	},
});

export default tabListTheme;
