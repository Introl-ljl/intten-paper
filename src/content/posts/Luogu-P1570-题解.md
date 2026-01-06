---
title: Luogu-P1570-题解
date: "2024-05-19"
description: 刚开始做这道题可能没什么思路，所以我们先从式子入手：假设存在最优解ans：$ans=\frac{\sum v_i}{\sum c_i}$转化得 $ans\times\sum c_i=\sum v_i$移项得 $ans\times \sum c_i-\sum v_i=0$可见，当式子的结果趋向 $ 0$ 时，ans是最优解。所以我们可以设 $f(ans)=ans\times\sum c_i-\sum v_i$
tags: ['题解', 'Luogu']
draft: false
---
# P1570 题解

## 题目分析

刚开始做这道题可能没什么思路，所以我们先从式子入手：

假设存在最优解ans：$ans=\frac{\sum v_i}{\sum c_i}$

转化得 $ans\times\sum c_i=\sum v_i$

移项得 $ans\times \sum c_i-\sum v_i=0$

可见，当式子的结果趋向 $ 0$ 时，ans是最优解。

所以我们可以设 $f(ans)=ans\times\sum c_i-\sum v_i$

显然，$f(ans)$是一个一次函数，具有单调性。这个时候就会想到可以使用二分答案来解决这个问题。

既然使用二分答案来解决，首先应该考虑**边界问题**，这道题的边界比较好设定，左端点显然为$ 0$，而右端点的设定，我们秉持着不怕大只怕小的原则，可以将其设定为$\sum v_i$。

然后考虑**check函数**问题，思考之后可以发现，我们只需要判断在ans确定的情况下，最优的取法。所以考虑贪心，把每种调料的$f(ans)$计算出来，从小到大排序之后取前$m$个调料的一次函数值并累加。计算之后的数值与零相比较，如果小于零的话，说明$ans$还可以更大，反之则应该更小。

到这里，这道题目就ac了，要注意好细节问题。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long 
int n,m,cnt=0;;
struct coffee{
    int v,c;
    double tot;
}a[10010];
void read(){
    cin>>n>>m;
    for(int i=1;i<=n;i++){
        cin>>a[i].v;cnt+=a[i].v;
    }
    for(int i=1;i<=n;i++){
        cin>>a[i].c;
    }
}
bool cmp(coffee a,coffee b){
    return a.tot<b.tot;
}
bool check(double x){
    for(int i=1;i<=n;i++){
        a[i].tot=x*a[i].c-a[i].v;
    }
    double sum=0;
    sort(a+1,a+n+1,cmp);
    for(int i=1;i<=m;i++){
        sum+=a[i].tot;
    }
    return sum<=0;
}
double search(){
    double l=0,r=cnt;
    while(r-l>=1e-5){
        double mid=(l+r)/2.0;
        //cout<<mid<<endl;
        if(check(mid)){
            l=mid;
        }
        else{
            r=mid;
        }
    }
    return l;
}
signed main(){
    read();
    double ans=search();
    printf(“%.3lf”,ans);
    return 0;
}
```