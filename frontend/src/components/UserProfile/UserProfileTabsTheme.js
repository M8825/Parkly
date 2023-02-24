import { extendTheme } from "@chakra-ui/react";

const UserProfileTabsTheme = extendTheme({
	components: {
		Tabs: {
			baseStyle: {
				tab: {
					_selected: {
						color: "#0C1059",
						borderColor: "#006AFF",
						borderBottom:
							"4px solid #F28416",
						borderRadius: "5px",
					},

					_hover: {
						color: "#A9BF99",
					},
				},
			},
		},
	},
});

export default UserProfileTabsTheme;
