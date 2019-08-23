/**
 * 容器类组件
 */

// 引用mirrorx作为connect
import mirror, { connect } from 'mirrorx';
// 默认页面组件
import FormView from './components/index';
//引用模型
import model from './model'

// 数据和组件UI关联、绑定
mirror.model(model);

export const FunctionRegister = connect(state => state.func_register,null)(FormView);
