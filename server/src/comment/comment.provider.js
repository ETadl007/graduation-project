// 查询片段
export const sqlFragment = {
    commentOrderNew: `
        createdAt DESC
    `,
    commentOrderHot: `
        thumbs_up DESC
    `
}
