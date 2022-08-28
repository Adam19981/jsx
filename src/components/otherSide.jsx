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
            <el-menu defaultActive="1-4-1"
                     backgroundColor='#545c64'
                     style={{height:'100%',width:'100%',textAlign:'center'}}
                     textColor='#fff' activeTextColor='#ffd04b'
                     collapse={this.isCollapse}>
                <h3 class={otherSideStyle.title}>{this.isCollapse ? '后台' : '通用后台管理系统'}</h3>
                {this.getMenu.map(item => {
                    if (item.isShowChildren) {
                        return <el-submenu  index={item.path} style={{textAlign:'left'}}
                        >
                            <div slot={'title'}>
                                <span class={item.meta.icon}/>
                                <span>{item.meta.title}</span></div>


                            {item.children.map(ite => {
                                return <el-menu-item-group>
                                    <el-menu-item   onClick={() => {
                                        this.clickMenu(ite)
                                    }

                                    }>{ite.meta.title}</el-menu-item>
                                </el-menu-item-group>
                            })}
                        </el-submenu>
                    } else {
                        return <el-menu-item style={{textAlign:'left'}}  onClick={() => {
                            this.clickMenu(item)
                        }
                        }>
                            <div slot={'title'}>
                                <i class={item.meta.icon}/>
                                <span>{item.meta.title}</span>
                            </div>
                        </el-menu-item>
                    }
                })}
            </el-menu>
        )
    }
}

export default otherSide