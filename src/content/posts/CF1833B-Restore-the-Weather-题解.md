---
title: CF1833B Restore the Weather 题解
date: "2023-05-21"
description: 题意简述  给定两个长度为 ​n 的数组 ​a,b。 重排数组 ​b，使得 ​|a_i-b_i| 的值尽可能小且 ​|a_i - b_i|\le k。 保证有解。  分析 因为这道题是保证有解的，所以在 ​|a_i - b_i| 的值最小的情况下，​|a_i - b_i|\le k 这个条件是不必要的。可得本题做法为怎样重排 ​b 数组，保证 ​|a_i - b_i| 的值尽可能小。显然，通过简要...
tags: ['题解', 'Codeforces']
draft: false
---
### 题意简述

- 给定两个长度为 $n$ 的数组 $a,b$。
- 重排数组 $b$，使得 $|a_i-b_i|$ 的值尽可能小且 $|a_i - b_i|\le k$。
- 保证有解。

### 分析

因为这道题是保证有解的，所以在 $|a_i - b_i|$ 的值最小的情况下，$|a_i - b_i|\le k$ 这个条件是不必要的。可得本题做法为怎样重排 $b$ 数组，保证 $|a_i - b_i|$ 的值尽可能小。显然，通过简要的转化可得，当 $a,b$ 按照升序或降序排列的时候，$|a_i-b_i|$ 的值尽可能小。注意一点，在题目中，要求以 $a$ 数组的原顺序来输出重排后的 $b$ 数组。我们可以使用结构体存储 $a_i$ 的原编号，对结构体排序之后按照这个顺序进行输出即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
const int MaxN = 1e5 + 100;
const int INF = 1e9;
int T=1, N, M;
template<class T>
inline void qread(T &sum)
{
    sum=0;int boo=1;
    char x=getchar();
    while(x<'0'||x>'9'){if(x=='-')boo=-1;x=getchar();}
    while(x>='0'&&x<='9'){sum=(sum<<1)+(sum<<3)+x-'0';x=getchar();}
    sum*=boo;
}
template<class T>
void qput(T x)
{
    if(x<0){
        x=-x;
        putchar('-');}
    if(x>9)
        qput(x/10);
   putchar(x%10+48);
}
struct f{
    int id ,a;
}a[MaxN];//结构体，id为原编号，a为值。

bool cmp(f a,f b){
    return a.a<b.a;//对结构体按照a的大小进行排序。
}
inline void Solve()
{
    int n,k;//其实与k的值是无关的。
    int b[MaxN],ans[MaxN];
    qread(n),qread(k);
    for(int i=0;i<n;i++){
        qread(a[i].a);
        a[i].id=i;//在输入a数组时记录a_i的编号。
    }
    for(int i=0;i<n;i++){
        qread(b[i]);
    }
    sort(b,b+n);
    sort(a,a+n,cmp);
    for(int i=0;i<n;i++){
        ans[a[i].id]=b[i];//存储重排之后的b数组
    }
    for(int i=0;i<n;i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;
}
signed main()
{
    cin >> T;
    while (T--)
       Solve();
    return 0;
}
```