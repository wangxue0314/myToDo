'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//这边增加了一个checked属性，因为每一个新建的todo，它的title是用户输入的。但是它的isDone默认是false
		//所以这里的TodoItem组件接收到调用者的参数todo，就是通过this.props.todo.isDone获得这个todo的状态是完成还是未完成
		//通过isDone控制这个todo条目前面的checkedbox是否要打勾。
		//在label标签中显示todo的title内容，也即是用户输入的值
		return (
			<li className="">
				<div className="view">
					<input checked={this.props.todo.isDone} className="toggle" type="checkbox" />
					<label>{this.props.todo.title}</label>
					<button className="destroy" />
				</div>
			</li>
		);
	}
}