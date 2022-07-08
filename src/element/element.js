import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Row,
    Col,
    Input,
    Table,
    TableColumn,
    Checkbox,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Dialog,
    Tree,
    Upload,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    MessageBox,
    Card,
    Tag
  } from 'element-ui';


Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Checkbox);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(Tag);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;