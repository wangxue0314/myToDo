'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
//这里是为react增加数据库，有了数据库就可以缓存当前的数据：也就是所有的todo
//当网页刷新的时候，就能够载入上次存下来的内容。
//好像在编译的时候要引入库文件，这里没有弄，可以在github上搜索它的官方配置方法
//文中所有使用到localDb的地方，都注释掉了。因为改库文件后，统一替换它上面的一行代码就可以了
//import LocalDb from "localDb";
import TodoItem from './todo-item.jsx';

var ENTER_KEY = 13;

export default class TodoApp extends React.Component {
	constructor(props) {
		super(props);

		//this.db = new LocalDb('React-Todos')
		this.state = {
			todos: []

			//先从数据库中加载上次缓存的todos，如果加载失败，则初始化为空[]
			//todos: this.db.get("todo") || []
		};
	}
	
	addTodo(todoItem) {
		this.state.todos.push(todoItem);

		//每次新增加todo后，都要加入到数据库中
		//this.db.set('todo', this.state.todos)


		//这里需要注意，this.state.todos.push往this.state中push一个todo
		//虽然改变了this.todo，但是并不会调用该组件的render重新加载该组件
		//好像是必须调用this.setState方法才可以使该组件调用其render方法重新加载
		//千万注意
		this.setState({todos: this.state.todos});
	}
	handleKeyDown(event) {
		if(event.keyCode == ENTER_KEY) {

			//从event.target.value中获取输入框中的值
			//这里当然也可以通过refs的方式获取，具体二者有什么区别：不清楚。。。。
			let value = event.target.value;
			if(!value) return false;

			//如果输入框不为空，则新建一个todo
			let newTodoItem = {
				//新建的todo：
				//内容是用户输入的内容，字段命名为title
				//isDone表示默认状态是完成还是未完成的todo
				
				title: value,
				isDone: false
			};
			//清空输入框，等待下一次输入
			event.target.value = "";

			//调用addTodo函数，把新的todo增加到this.state.todos中去
			//并调用this.setState，触发react的render函数，进行重新加载组件
			this.addTodo(newTodoItem);
		}
	}

	render() {
		return (
			<div>
				<header className="header">
					<h1>TodoApp</h1>
					<input className="new-todo" 
						   onKeyDown={this.handleKeyDown.bind(this)}
						   placeholder="What needs to be done?" 
						   autoFocus={true} />
				</header>

				<section className="main">
					<input className="toggle-all" 
						   type="checkbox" />
					<ul className="todo-list">

						{/* 注意这里=>符号的用法：
						  */
							this.state.todos.map((todo) => {
							return <TodoItem todo={todo} />
						})}
						/* all the todo list items here */
					</ul>
				</section>
			</div>
		);
	}
}
