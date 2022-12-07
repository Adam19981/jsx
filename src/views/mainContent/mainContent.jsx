import otherSide from "./otherSide/index";
import menuHeader from "./menuHeader";
import tagger from "./tagger";

const mainContent = {
	name: "mainContent",
	components: { otherSide, menuHeader, tagger },

	render() {
		return (
			<el-container style={{ height: "100vh" }}>
				<el-aside width="auto">
					<otherSide />
				</el-aside>
				<el-container>
					<el-header>
						<menu-header />
					</el-header>
					<el-main style={{ backgroundColor: "#eee" }}>
						<tagger />
						<transition appear name="el-fade-in-linear">
							<router-view />
						</transition>
					</el-main>
				</el-container>
			</el-container>
		);
	}
};
export default mainContent;
