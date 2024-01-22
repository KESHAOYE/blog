  export interface sideBarDefaultConfig {
    contentRoot?: string, // 根目录
    collapsed?: boolean, // 是否折叠
    suffix?: string[], // 读取指定后缀
    except?: string[], // 需要排除的文件/文件夹（与指定目录冲突）
    useArticleInfo?: boolean, // 使用（文章标题/文件名）作为标题
    titleHideExtname?:boolean, // 标题是否隐藏后缀
    parentNodePage?:string, // 父节点文件名称
    useModule?:Boolean, // 是否分模块渲染
    author?:String, // 默认作者
    sort?:Object
  }
  
  type sortObject = {
    mode: 'articleNo' | 'articlePage',
    method: 'asc' | 'dsc',
    fn: Function 
  }

  export interface articleMetaInfo {
    title: String,
    author: String,
    showAuthor: Boolean,
    reference: {
      link: String,
      title: String,
      author: String,
      from: 'unknow' | 'juejin' | 'wechat' | 'CSDN' | 'other'
    }
  } 

  export interface SidebarItem {
    text: string,
    link?: string | boolean,
    collapsed?: boolean,
    items?: SidebarItem[]
  }
