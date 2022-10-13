import React, {useState, useRef} from "react";

function Todo() {
    // useState로 todo input에 값을 입력할때 마다 setTodo로 value값 변경을 해준다.
    const [todo, setTodo] = useState();

    // 로컬스토리지의 items 이라는 키의 값들을 getItem으로 받아온 뒤 JSON형식으로 변환한다.
    var itemBox = JSON.parse(localStorage.getItem("items"));

    // todoInput이라는 고유의 이름으로 input의 이름을 설정한다.
    const todoInput = useRef();

    // todoUpdate로 onChange 이벤트를 설정하여 해당 e.target된 input의 값을 setTodo로 변경한다.
    const todoUpdate = (e) => {
        setTodo(e.target.value);
    }

    // registTodo 이벤트를 설정한다.
    const registTodo = () => {
        // 만약 input에 입력받은 값이 빈 공백문자열일 경우
        if(todo === "") {
            // alert 경고창을 띄운다.
            alert("할 일을 입력해주세요");
            // useRef로 설정한 input에 focus를 준다.
            todoInput.current.focus();
        } else {
            // setTodo로 input의 값을 강제로 변경한다.
            setTodo("");
            // useRef로 설정한 input에 focus를 준다.
            todoInput.current.focus();
            // 만약 로컬스토리지의 items라는 키의 값을 가져왔을때 null이 아니라면 기존 값이 있다는 의미가 된다.
            if(localStorage.getItem("items") != null) {
                // itemBox라는 변수에 로컬스토리지의 item이라는 키의 값을 JSON 형식으로 parse한다.
                var itemBox = JSON.parse(localStorage.items);
                // itemBox에 입력했던 todo를 itemBox에 넣는다.
                itemBox.push({
                    work: todo,
                    finished: false,
                    checked: false
                })
                // 로컬스토리지의 items 키를 가진 데이터에 itemBox를 문자열로 변환한 뒤 setItem으로 값을 넣는다.
                localStorage.setItem("items", JSON.stringify(itemBox));
            } else {
                // else인 경우는 기존 값이 없는 로컬스토리지가 비어있는 경우이다.
                // 로컬 스토리지에 items라는 키를 가진 데이터에 todo로 입력받은 값을 배열로 문자열로 변환한 후 setItem으로 값을 넣는다.
                localStorage.setItem("items", JSON.stringify([{work: todo, finished: false, checked: false}]));
            }
        }
    }

    // 엔터키를 눌렀을때 이벤트,
    const onKeyPress = (e) => {
        // 만약 입력한 키가 Enter키 라면
        if(e.key === "Enter") {
            // 해당 이벤트를 실행한다.
            registTodo();
        }
    }

    return (
        <>
            <div className="todo-input-box clearfix">
                <input placeholder="할 일을 입력해주세요" className="todo-input" value={todo || ""} onChange={todoUpdate} ref={todoInput} onKeyPress={onKeyPress} />
                <button className="todo-regist" onClick={registTodo} >등록</button>
            </div>
            <div className="todo-list">
                <ul>
                    {
                        // itemBox가 null인 경우는 로컬스토리지는 비어있다는 의미이다.
                        itemBox === null
                        ? <li className="no-item">내용이 없습니다.</li>
                        // 아닌경우에는 itemBox안에 컨텐츠가 있으므로 map 함수로 데이터를 뿌려준다.
                        // map 함수로 item은 해당 배열, index는 해당 배열의 인덱스 값을 파라미터로 받는다.
                        : itemBox.map((item, index) => (
                            <li key={index} className={"clearfix"}>
                                <input type="checkbox" id={`item-${index}`} />
                                <label htmlFor={`item-${index}`} />
                                <p><span>{item.work}</span></p>
                                <div className="item-remote clearfix">
                                    <button className="modify-btn">수정하기</button>
                                    <button className="delete-btn">삭제하기</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Todo;