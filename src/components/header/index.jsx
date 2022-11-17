import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import data from './data.json'
// import _ from 'lodash'

const Header = (() => {
	// const [boxArr, setBoxArr] = useState([])
	const [arrData, setArrData] = useState([])
	const [dirctionNum, setDirctionNum] = useState([8, 5, 2]) // 横向、纵向数目；

	useEffect(() => {
		let newArr = []
		// 先取得词语
		const randomWords = getExtract(data.data, dirctionNum[0] * dirctionNum[1] / dirctionNum[2])
		randomWords.forEach(e => {
			newArr.push(
				{
					word: e[0], position: 1, words: e
				},
				{
					word: e[1], position: 2, words: e
				}
			)
		});

		console.log(newArr)
		// setBoxArr(newArr)
		setArrData(getRandomStart(dirctionNum[0], dirctionNum[1], newArr))
	}, [dirctionNum])

	// 第一步，需要给单词的每个字填充到单元格内；
	//      拆分成单个字填充进去，如果个单个字怎么保证词语在一块
	//      获取词语后给每个词语一个标识符号，这样就能知道他俩是一个词语；
	//      然后给词语打乱，拼接成图形；


	// 随机获取数组的几个值，不重复
	function getExtract(array, length) {
		const copyArray = [...array]
		if (copyArray.length < length) {
			throw new Error('数据不够！')
		}
		const newArray = []
		for (let i = 0; i < length; i++) {
			const random = (min, max) => Math.floor(Math.random() * (max - min) + min); //随机数方法
			let index = random(0, copyArray.length); //生成一个从最小值为0 最大值为数组长度的随机数
			newArray.push(...copyArray.splice(index, 1))
		}
		console.log(newArray)
		return newArray
	}

	/**
	 * @description 获取方格数组及数据
	 * @param {*} horizontal 横向数目
	 * @param {*} vertical 纵向数目
	 */
	function getRandomStart(horizontal, vertical, newArr, wordsLenght = 2) {
		// 棋盘格子，有数据代表填入字，没有代表可以填入
		// 横轴，纵轴都用数组来代替，有元素就填入数
		let horizontalArr = getHorizontalArr(horizontal, 0)
		let checkerBorder = JSON.parse(JSON.stringify(getHorizontalArr(vertical, horizontalArr)))
		let useIndex = 0 // 使用的索引；

		// 纵向
		列: for (let m = 0; m < vertical; m++) {
			// 横向
			for (let i = 0; i < horizontal; i++) {
				// 如果格子里没有值，可以进入填入字
				if (checkerBorder[m][i] === 0) {
					// TODO：最后两行容易出现无法再次满足设置汉字问题，通过try catch捕获错误
					const reverse = Math.round(Math.random())
					let words = []
					if (reverse) {
						words = [newArr[useIndex], newArr[useIndex + 1]]
					} else {
						words = [newArr[useIndex + 1], newArr[useIndex]]
					}
					checkerBorder[m][i] = words[0]
					useIndex = useIndex + 2
					console.log(checkerBorder)
					console.log({ m, i })

					try {
						// 格子后面、下面都无值，并且不是最后一个还有值，进入随机方向
						if (i + 1 < horizontal && !checkerBorder[m][i + 1] && m + 1 < vertical && !checkerBorder[m + 1][i]) {
							// 随机数，0 横向，1 纵向
							const dirction = Math.round(Math.random())
							if (dirction) {
								checkerBorder[m][i + 1] = words[1]
								console.log('横向')
							} else {
								checkerBorder[m + 1][i] = words[1]
								console.log('竖向')
							}
						}
						// 一行最后一个没有其余空间 或 后面没有空间 下面有空间
						else if ((i + 1 === horizontal && !checkerBorder[m + 1][i])
							|| (i + 1 < horizontal && checkerBorder[m][i + 1] && m + 1 <= vertical && !checkerBorder[m + 1][i])) {
							checkerBorder[m + 1][i] = words[1]
							console.log('竖向')
						}
						// 下面最后一行 后面一个有空间
						else if ((m + 1 === vertical && !checkerBorder[m][i + 1])) {
							checkerBorder[m][i + 1] = words[1]
							console.log('横向')
						}
						else {
							// 进这里面就会出错；
							console.warn('进入未设置条件，出错！')
						}
					} catch (err) {
						// console.error(err)
						console.error('这一步，无法设置汉字！')
						alert('部分文字无法填入！')
						break 列;
					}
				}
			}
		}
		console.log(checkerBorder)
		return checkerBorder
	}

	// 获取横向数组
	function getHorizontalArr(length, defaultValue) {
		let horizontalArr = []
		for (let i = 0; i < length; i++) {
			horizontalArr.push(defaultValue)
		}
		return horizontalArr
	}

	return (
		<div className={styles.content}>
			<div className={styles.Header}>
				<button className={styles.Item} onClick={() => { setDirctionNum([5, 4, 2]) }}> 5 x 4 </button>
				<button className={styles.Item} onClick={() => { setDirctionNum([8, 5, 2]) }}> 8 x 5 </button>
			</div>

			<div className={styles.contentBox}>
				{
					/* boxArr.map((item, index) => {
							return (
									<div className={styles.itemBox} key={index} onClick={_.debounce(() => {
											console.log('点击了' + item.word)
									}, 300)}>{item.word}</div>
							)
					}) */
					arrData.map((item, index) => {
						return (
							<div className={styles.row} key={index}>
								{item.map((e, i) => {
									return (
										<div className={styles.column} key={index + '' + i}>{e?.word}</div>
									)
								})}
							</div>
						)
					})
				}
			</div>
		</div>
	)
})

export default Header
