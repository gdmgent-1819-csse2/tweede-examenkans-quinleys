export default class Matrix4
{
    constructor(items)
    {
        this.items = items || [
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
        ]
    } 

    add(m)
    {
        const a = this.items
        let b = m
        this.items = [
            a[0] + b[0] , a[1] + b[1] , a[2] + b[2] , a[3] + b[3] ,
            a[4] + b[4] , a[5] + b[5] , a[6] + b[6] , a[7] + b[7] ,
            a[8] + b[8] , a[9] + b[9] , a[10] + b[10] , a[11] + b[11] ,
            a[12] + b[12] , a[13] + b[13] , a[14] + b[14] , a[15] + b[15]
        ]
    }

    sub(m)
    {
        const a = this.items
        let b = m
        this.items = [
            a[0] - b[0] , a[1] - b[1] , a[2] - b[2] , a[3] - b[3] ,
            a[4] - b[4] , a[5] - b[5] , a[6] - b[6] , a[7] - b[7] ,
            a[8] - b[8] , a[9] - b[9] , a[10] - b[10] , a[11] - b[11] ,
            a[12] - b[12] , a[13] - b[13] , a[14] - b[14] , a[15] - b[15] 
        ]
    }

    mul()
    {
        const a = this.items
        const c = []
/*
        c[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12]
        c[1] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[2] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[3] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[4] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[5] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[6] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[7] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[8] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[9] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[10] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[11] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[12] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[13] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[14] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
        c[15] = a[] * b[] + a[] * b[] + a[] * b[] + a[] * b[]
*/
        this.items = c
    }
}