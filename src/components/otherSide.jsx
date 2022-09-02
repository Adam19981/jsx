import otherSideStyle from './otherSide.module.scss'



const otherSide = {
    name: 'otherSide',
    data() {
        return {}
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse
        },
        getMenu() {
            return this.$store.state.menu
        },
    },
    methods: {
        clickMenu(item) {
            this.$router.push({name: item.name})
            this.$store.commit('addBreadcrumb', item)
        }
    },
    render() {
        return (
            <el-menu
                     style={{height:'100%',textAlign:'center',width:'200px'}}
                     class={otherSideStyle.menuDiv}
                     textColor='#fff' activeTextColor='#ffd04b'
                     collapse={this.isCollapse}>
                <h3 class={otherSideStyle.title}>{this.isCollapse ? '后台' : '通用后台管理系统'}</h3>
                {this.getMenu.map(item => {
                    if (!item.hidden){
                        if (item.isShowChildren) {
                            return <el-submenu  index={item.path} style={{textAlign:'left'}}>
                                <template slot={'title'}>
                                    <i class={item.meta.icon}/>
                                    <span>{item.meta.title}</span>
                                </template>
                                <el-menu-item-group>
                                    {item.children.map(ite => {
                                        if (!ite.hidden){
                                            return <el-menu-item index={ite.path} onClick={() => {
                                                this.clickMenu(ite)}}>
                                                {ite.meta.title}
                                            </el-menu-item>

                                        }
                                    })}
                                </el-menu-item-group>

                            </el-submenu>
                        } else {
                            return <el-menu-item style={{textAlign:'left'}} index={item.path} onClick={() => {
                                this.clickMenu(item)}}>
                                <i class={item.meta.icon}/>
                                <span>{item.meta.title}</span>
                            </el-menu-item>
                        }
                    }
                })}
            </el-menu>
        )
    }
}

export default otherSide