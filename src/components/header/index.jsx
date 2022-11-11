import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import data from './data.json'
import _ from 'lodash'

const Header = (() => {
    const [boxArr, setBoxArr] = useState([])
    useEffect(() => {
        const randomWords = getRandomArrayElements(data.data, 10)

        let newArr = []
        randomWords.forEach(e => {
            newArr.push(
                {
                    word: e[0], position: 1, words: e
                },
                {
                    word: e[1], position: 2, words: e
                })
        });



        getRandomStart(5, 4)

        console.log(newArr)
        setBoxArr(newArr)
    }, [])

    // 第一步，需要给单词的每个字填充到单元格内；
    //      拆分成单个字填充进去，如果个单个字怎么保证词语在一块
    //      获取词语后给每个词语一个标识符号，这样就能知道他俩是一个词语；
    //      然后给词语打乱，拼接成图形；


    // 随机获取数组的几个值
    function getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp,
            index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    // 随机获取显示什么图形

    /**
     * @description
     * @param {*} horizontal 横向数目
     * @param {*} portrait 纵向数目
     */
    function getRandomStart(horizontal, portrait) {
        // 20格子 4*5
        // 棋盘格子，有数据代表填入字，没有代表可以填入
        let checkerBorder = new Array(horizontal * portrait)
        console.log(checkerBorder)



    }

    function handleClick() {
        console.log(new Date())
    }

    return (
        <div className={styles.Header}>
            <div className={styles.contentBox}>
                {
                    boxArr.map((item, index) => {
                        return (
                            <div className={styles.itemBox} key={index} onClick={_.debounce(handleClick, 300)}>{item.word}</div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default Header
