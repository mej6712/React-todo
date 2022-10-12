import React, {useState, useEffect} from "react";

function Todo() {
    const [todo, setTodo] = useState("");

    return (
        <>
            <div className="todo-input-box clearfix">
                <input placeholder="할 일을 입력해주세요" className="todo-input" value={todo} />
                <button className="todo-regist" >등록</button>
            </div>
        </>
    )
}

export default Todo;