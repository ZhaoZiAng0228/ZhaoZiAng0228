import React, { useState, useEffect, useCallback } from 'react'
// 我自己的window监听事件钩子
// import useEventListener from '@/hooks/use-event-listener'
// 第三方的类名库，超级好用，喜欢～
import classnames from 'classnames'
// 引入表格组件，表格属性
import { Table, TableProps } from 'antd'
// 我自己封装的math方法，其实也就是import math from 'mathjs'里面的方法
// import math from '@/utils/math'
// 组件专属样式，省的污染别人
import './scroll-table.scss'

// 既然是二次封装，那么当然有额外的自定义属性控制行为，继承了ant Table的全部属性
interface ScrollTableProps extends TableProps<any> {
    className?: string,
    id: string,
    heightAuto?: boolean,
    xScroll?: boolean,
    yScroll?: boolean,
    heghtAuto: any
}

const ScrollTable: React.FC<ScrollTableProps> = React.memo(props => {
    const {
        className = '',
        // 因为页面里面可能存在多个表格，或者单页面缓存时存在多个表格，计算高度时的找表格判断
        id,
        // 是否取消在一定范围内的高度自适应，默认不，开启后就算yScroll开启也没用
        heghtAuto = false,
        // 是否开启表头横向滚动
        xScroll = false,
        // 是否开启表格内容的高度自适应滚动
        yScroll = false,
        // 已知占位的区域高度
        scroll,
        // 数据源
        dataSource,
        ...restProps
    } = props
    const dataSourceLength = dataSource?.length
    const [x, setX] = useState(scroll?.x)
    const [y, setY] = useState(scroll?.y)

    // 没数据的时候，表头过长，请一定要在规定的区域内，都能左右滑动表头，不能死死的规定鼠标只能在表头范围内才能滑动
    useEffect(() => {
        if (xScroll && id) {
            const parent = document.getElementById(id)
            if (parent) {
                const FixedWidth = props.columns!.filter(item => item.width).map(item => Number(item.width)).reduce((m, n) => m + n, 0)
                const RemainItemArr = props.columns!.filter(item => !item.width).map(item => item.title!.toString().length)
                const RemainItemWidth = (Math.max(...RemainItemArr) + 1) * 12 + 8 * 2 + 2
                const RemainWidth = RemainItemArr.length * RemainItemWidth
                // 表头列数据过多时，自动可以横向滚动，不要挤压在一起
                setX(Math.max(parent.getBoundingClientRect().width, FixedWidth + RemainWidth))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [xScroll, id])

    // 有数据的时候，请一定要在规定的区域内，表头死活不能上下移动，表格内容死活一定要能上下左右随意滑动
    const handleResizeY = useCallback(() => {
        if (yScroll && id) {
            const parent = document.getElementById(id)
            if (parent) {
                const thead = parent.getElementsByClassName('ant-table-thead')[0]
                if (thead) {
                    const ParentHeight = parent.getBoundingClientRect().height
                    const TheadHeight = thead.getBoundingClientRect().height
                    // const height = math.subtract(ParentHeight, TheadHeight)
                    // setY(height)
                    setTimeout(() => {
                        const tbody = parent.getElementsByClassName('ant-table-body')[0]
                        if (tbody) {
                            // (tbody as HTMLElement).style.height = height + 'px';
                        }
                        // 没数据的时候，请一定将“暂无数据”的UI图上下左右居中
                        const placeholder = parent.getElementsByClassName('ant-table-placeholder')[0]
                        if (placeholder) {
                            // (placeholder as HTMLElement).style.height = height + 'px'
                        }
                    }, 30)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yScroll, id, dataSourceLength])

    // 初始化
    useEffect(() => {
        handleResizeY()
    }, [handleResizeY])

    // 监听页面缩放，重新计算高度和宽度
    // useEventListener('resize', handleResizeY)

    const classes = classnames(className, {
        'C-scroll_table': true,
        'C-scroll_table-auto': heghtAuto // 样式控制取消自适应
    })

    return (
        <div className={classes}
            id={id}>
            <Table size="small"
                pagination={false}
                {...restProps}
                dataSource={dataSource}
                scroll={{ x, y }} />
        </div>
    )
})

export default ScrollTable