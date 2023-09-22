// jsx代码
import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group'
import './index.css'

//  css 的使用分模块化和 直接引入
//  css模块化，使用时需要像对象一样引用；

const Transition = () => {
    const [isShow, setIsShow] = useState(true)

    return (
        <div className="donghua">
            <button onClick={() => setIsShow(!isShow)}>
                当前状态：{isShow ? '显示' : '隐藏'}</button>
            <CSSTransition
                in={isShow}
                classNames='box'
                timeout={500}
                unmountOnExit={true}>
                <div className="hello">
                    hello
                </div>
            </CSSTransition>

            参考链接https://www.jianshu.com/p/49fa164b938d
        </div>
    )
}

export default Transition

