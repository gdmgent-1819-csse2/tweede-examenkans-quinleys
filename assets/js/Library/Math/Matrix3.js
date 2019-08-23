export default class Matrix3
{
    constructor(items)
    {
        this.items = items || [
            0,0,0,
            0,0,0,
            0,0,0
        ]
    } 

    add(m)
    {
        const a = this.items
        let b = m
        this.items = [
            a[0] + b[0] , a[1] + b[1] , a[2] + b[2],
            a[3] + b[3] , a[4] + b[4] , a[5] + b[5],
            a[6] + b[6] , a[7] + b[7] , a[8] + b[8] 
        ]
    }

    sub(m)
    {
        const a = this.items
        let b = m
        this.items = [
            a[0] - b[0] , a[1] - b[1] , a[2] - b[2],
            a[3] - b[3] , a[4] - b[4] , a[5] - b[5],
            a[6] - b[6] , a[7] - b[7] , a[8] - b[8]
        ]
    }

    mul()
    {
        const a = this.items
        const c = []
/*
        c[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6]
        c[1] = a[] * b[] + a[] * b[] + a[] * b[]
        c[2] = a[] * b[] + a[] * b[] + a[] * b[]
        c[3] = a[] * b[] + a[] * b[] + a[] * b[]
        c[4] = a[] * b[] + a[] * b[] + a[] * b[]
        c[5] = a[] * b[] + a[] * b[] + a[] * b[]
        c[6] = a[] * b[] + a[] * b[] + a[] * b[]
        c[7] = a[] * b[] + a[] * b[] + a[] * b[]
        c[8] = a[] * b[] + a[] * b[] + a[] * b[]
*/
        this.items = c
    }
}