import otherSide from '@/components/otherSide.jsx'
import menuHeader from '@/components/menuHeader.vue'
import tagger from '@/components/tagger.vue'

const mainContent = {
    name: 'mainContent',
    components: {otherSide, menuHeader, tagger},

    render() {
        return (
            <el-container style={{width:'100%',height:'100vh'}}>
                <el-aside style={{width:'200px',height:'100%'}}>
                    <otherSide/>
                </el-aside>
                <el-container>
                    <el-header>
                        <menu-header/>
                    </el-header>
                    <tagger/>
                    <el-main style={{backgroundColor: '#eee'}}>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        )

    }

}
export default mainContent