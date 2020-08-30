import Vue from 'vue';
import { Button,
    Container,
    Header,
    Aside,
    Main,Menu,Submenu,MenuItem,Form,FormItem,Input,Switch,Upload,Select,
    Option,Table,TableColumn,Message,MessageBox,Pagination,Row,Col,Dialog
    } from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
